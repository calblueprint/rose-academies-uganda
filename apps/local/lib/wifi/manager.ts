import { execFile, spawn } from "child_process";
import { readFile } from "fs/promises";
import { hostname } from "os";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const WIFI_INTERFACE = process.env.ROSE_WIFI_INTERFACE ?? "wlan0";
const WIFI_HELPER =
  process.env.ROSE_WIFI_HELPER ?? "/usr/local/sbin/rose-wifi-manager";
const WIFI_RESULT_FILE =
  process.env.ROSE_WIFI_RESULT_FILE ?? "/var/lib/rose-wifi/last-result";
const WIFI_MOCK_ENABLED = process.env.ROSE_WIFI_MOCK === "true";
let mockConnected = false;

export type WifiNetwork = {
  ssid: string;
  signal: number;
  security: string;
  active: boolean;
};

export type WifiStatus = {
  supported: boolean;
  hostname: string;
  hotspotName: string | null;
  connectionName: string | null;
  connectivity: string;
  hotspotActive: boolean;
  networks: WifiNetwork[];
  lastResult: { status: string; message: string } | null;
};

function splitNmcliLine(line: string) {
  const fields: string[] = [];
  let field = "";
  let escaped = false;

  for (const character of line) {
    if (escaped) {
      field += character;
      escaped = false;
    } else if (character === "\\") {
      escaped = true;
    } else if (character === ":") {
      fields.push(field);
      field = "";
    } else {
      field += character;
    }
  }

  if (escaped) field += "\\";
  fields.push(field);
  return fields;
}

async function runNmcli(args: string[]) {
  const { stdout } = await execFileAsync("nmcli", args, {
    timeout: 15_000,
    maxBuffer: 1024 * 1024,
  });

  return stdout.trim();
}

async function runWifiHelper(args: string[]) {
  const { stdout } = await execFileAsync("sudo", [WIFI_HELPER, ...args], {
    timeout: 15_000,
    maxBuffer: 1024 * 1024,
  });

  return stdout.trim();
}

async function readLastResult() {
  try {
    const [status, ...messageParts] = (await readFile(WIFI_RESULT_FILE, "utf8"))
      .trim()
      .split("\t");

    return status ? { status, message: messageParts.join("\t") } : null;
  } catch {
    return null;
  }
}

function parseNetworks(output: string): WifiNetwork[] {
  const bySsid = new Map<string, WifiNetwork>();

  for (const line of output.split("\n")) {
    if (!line) continue;

    const [activeValue, ssid, signalValue, security = ""] =
      splitNmcliLine(line);

    if (!ssid) continue;

    const network: WifiNetwork = {
      ssid,
      signal: Number.parseInt(signalValue, 10) || 0,
      security: security === "--" ? "Open" : security,
      active: activeValue === "yes",
    };
    const existing = bySsid.get(ssid);

    if (!existing || network.signal > existing.signal || network.active) {
      bySsid.set(ssid, network);
    }
  }

  return [...bySsid.values()].sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return b.signal - a.signal;
  });
}

export async function getWifiStatus(): Promise<WifiStatus> {
  if (WIFI_MOCK_ENABLED) {
    return {
      supported: true,
      hostname: "rose-test-pi",
      hotspotName: "Rose-Setup-TEST",
      connectionName: mockConnected ? "Educator WiFi" : "Setup hotspot",
      connectivity: mockConnected ? "full" : "setup mode",
      hotspotActive: !mockConnected,
      networks: [
        {
          ssid: "Educator WiFi",
          signal: 88,
          security: "WPA2",
          active: mockConnected,
        },
        {
          ssid: "Community Center",
          signal: 64,
          security: "WPA2",
          active: false,
        },
        {
          ssid: "Open Library WiFi",
          signal: 42,
          security: "Open",
          active: false,
        },
      ],
      lastResult: null,
    };
  }

  if (process.platform !== "linux") {
    return {
      supported: false,
      hostname: hostname(),
      hotspotName: null,
      connectionName: null,
      connectivity: "unsupported",
      hotspotActive: false,
      networks: [],
      lastResult: null,
    };
  }

  const [connectionOutput, connectivityOutput, hotspotName, lastResult] =
    await Promise.all([
      runNmcli([
        "--terse",
        "--escape",
        "yes",
        "--fields",
        "GENERAL.CONNECTION",
        "device",
        "show",
        WIFI_INTERFACE,
      ]),
      runNmcli(["--terse", "--fields", "CONNECTIVITY", "general"]),
      runNmcli([
        "--get-values",
        "802-11-wireless.ssid",
        "connection",
        "show",
        "pi-ap",
      ]).catch(() => ""),
      readLastResult(),
    ]);
  let networksOutput = "";

  try {
    networksOutput = await runWifiHelper(["scan"]);
  } catch (error) {
    // Some single-radio adapters cannot rescan while serving the setup
    // hotspot. Manual SSID entry remains available in that case.
    console.warn("[WIFI SETUP] Network scan unavailable:", error);
  }

  const rawConnectionName = splitNmcliLine(connectionOutput)[1] || null;
  const hotspotActive = rawConnectionName === "pi-ap";
  const parsedNetworks = parseNetworks(networksOutput);
  const activeNetwork = parsedNetworks.find(network => network.active);
  const savedSsid =
    !hotspotActive && rawConnectionName
      ? await runNmcli([
          "--get-values",
          "802-11-wireless.ssid",
          "connection",
          "show",
          rawConnectionName,
        ]).catch(() => "")
      : "";

  return {
    supported: true,
    hostname: hostname(),
    hotspotName: hotspotName || null,
    connectionName: hotspotActive
      ? "Setup hotspot"
      : activeNetwork?.ssid || savedSsid || rawConnectionName,
    connectivity: connectivityOutput || "unknown",
    hotspotActive,
    networks: hotspotActive
      ? parsedNetworks.filter(network => !network.active)
      : parsedNetworks,
    lastResult,
  };
}

export async function scheduleWifiConnection({
  ssid,
  password,
  hidden,
}: {
  ssid: string;
  password: string;
  hidden: boolean;
}) {
  if (WIFI_MOCK_ENABLED) {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockConnected = true;
    return;
  }

  if (process.platform !== "linux") {
    throw new Error("Wi-Fi setup is only available on the Classroom Hub.");
  }

  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      "sudo",
      [WIFI_HELPER, "schedule-connect", ssid, hidden ? "yes" : "no"],
      { stdio: ["pipe", "pipe", "pipe"] },
    );
    let stderr = "";

    child.stderr.on("data", chunk => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(stderr.trim() || "Unable to schedule Wi-Fi setup."));
      }
    });

    child.stdin.end(`${password}\n`);
  });
}
