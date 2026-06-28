#!/bin/bash

set -euo pipefail

AP_CONNECTION_NAME="${ROSE_AP_CONNECTION_NAME:-pi-ap}"
WIFI_INTERFACE="${ROSE_WIFI_INTERFACE:-wlan0}"
REQUEST_FILE="${ROSE_WIFI_REQUEST_FILE:-/run/rose-wifi-request}"
STATE_DIR="${ROSE_WIFI_STATE_DIR:-/var/lib/rose-wifi}"
RESULT_FILE="$STATE_DIR/last-result"
SUPABASE_HEALTH_URL="${ROSE_SUPABASE_HEALTH_URL:-https://tyckvrwfblheqxuliscl.supabase.co/auth/v1/health}"
WAIT_ATTEMPTS="${ROSE_WIFI_WAIT_ATTEMPTS:-25}"
WAIT_SECONDS="${ROSE_WIFI_WAIT_SECONDS:-1}"

write_result() {
  local status="$1"
  local message="$2"

  mkdir -p "$STATE_DIR"
  printf '%s\t%s\n' "$status" "$message" > "$RESULT_FILE"
  chmod 0644 "$RESULT_FILE"
}

activate_hotspot() {
  nmcli connection up "$AP_CONNECTION_NAME"
}

delete_connection_if_present() {
  local connection_name="$1"
  nmcli connection delete "$connection_name" >/dev/null 2>&1 || true
}

scan_networks() {
  nmcli \
    --terse \
    --escape yes \
    --fields ACTIVE,SSID,SIGNAL,SECURITY \
    device wifi list \
    --rescan yes \
    ifname "$WIFI_INTERFACE"
}

schedule_connect() {
  local ssid="${1:-}"
  local hidden="${2:-no}"
  local password=""
  local unit_name=""

  unit_name="rose-wifi-connect-$(date +%s%N)"

  if [ -z "$ssid" ] || [[ "$ssid" == *$'\n'* ]] || [[ "$ssid" == *$'\r'* ]]; then
    echo "Invalid Wi-Fi network name." >&2
    exit 2
  fi

  if [ "$hidden" != "yes" ] && [ "$hidden" != "no" ]; then
    echo "Invalid hidden-network setting." >&2
    exit 2
  fi

  IFS= read -r password || true
  umask 077
  if [ -e "$REQUEST_FILE" ]; then
    echo "Another Wi-Fi connection attempt is already pending." >&2
    exit 3
  fi

  printf '%s\n%s\n%s\n' "$ssid" "$password" "$hidden" > "$REQUEST_FILE"
  write_result "pending" "$ssid"

  # Delay the radio switch long enough for the setup page to receive its HTTP
  # response. systemd owns the job, so it survives the hotspot disconnect.
  if ! systemd-run \
    --quiet \
    --collect \
    --unit "$unit_name" \
    --on-active=4s \
    "$0" apply-request; then
    rm -f "$REQUEST_FILE"
    write_result "failure" "Unable to schedule the Wi-Fi connection attempt."
    exit 1
  fi
}

apply_request() {
  local ssid=""
  local password=""
  local hidden="no"
  local connection_hash=""
  local connection_name=""

  if [ ! -f "$REQUEST_FILE" ]; then
    write_result "failure" "No pending Wi-Fi request was found."
    exit 1
  fi

  {
    IFS= read -r ssid
    IFS= read -r password || true
    IFS= read -r hidden || true
  } < "$REQUEST_FILE"
  rm -f "$REQUEST_FILE"

  connection_hash=$(printf '%s' "$ssid" | sha256sum | cut -c1-8)
  connection_name="rose-wifi-$connection_hash"

  nmcli connection down "$AP_CONNECTION_NAME" >/dev/null 2>&1 || true
  delete_connection_if_present "$connection_name"

  if [ -n "$password" ]; then
    if ! nmcli device wifi connect "$ssid" \
      password "$password" \
      ifname "$WIFI_INTERFACE" \
      name "$connection_name" \
      hidden "$hidden"; then
      write_result "failure" "The Pi could not join $ssid. Check the password."
      delete_connection_if_present "$connection_name"
      activate_hotspot
      exit 1
    fi
  else
    if ! nmcli device wifi connect "$ssid" \
      ifname "$WIFI_INTERFACE" \
      name "$connection_name" \
      hidden "$hidden"; then
      write_result "failure" "The Pi could not join the open network $ssid."
      delete_connection_if_present "$connection_name"
      activate_hotspot
      exit 1
    fi
  fi

  # Internet networks must always win over the fallback hotspot on later boots.
  nmcli connection modify "$connection_name" \
    connection.autoconnect yes \
    connection.autoconnect-priority 10 \
    connection.autoconnect-retries 0

  # Any HTTP response proves both internet and the configured Supabase host are
  # reachable. The health endpoint may return 401 without an API key, which is
  # expected and must not be treated as an offline connection.
  if curl --silent --show-error --max-time 15 \
    --output /dev/null "$SUPABASE_HEALTH_URL"; then
    write_result "success" "$ssid"
    exit 0
  fi

  write_result "failure" "$ssid connected, but Supabase was unreachable."
  nmcli connection down "$connection_name" >/dev/null 2>&1 || true
  delete_connection_if_present "$connection_name"
  activate_hotspot
  exit 1
}

ensure_hotspot() {
  local current_connection=""

  # Give NetworkManager time to reconnect a saved internet network before
  # falling back to the classroom/setup hotspot.
  for _ in $(seq 1 "$WAIT_ATTEMPTS"); do
    current_connection=$(
      nmcli --get-values GENERAL.CONNECTION device show "$WIFI_INTERFACE" \
        2>/dev/null || true
    )

    if [ -n "$current_connection" ] && [ "$current_connection" != "--" ]; then
      exit 0
    fi

    sleep "$WAIT_SECONDS"
  done

  activate_hotspot
}

case "${1:-}" in
  schedule-connect)
    schedule_connect "${2:-}" "${3:-no}"
    ;;
  apply-request)
    apply_request
    ;;
  ensure-hotspot)
    ensure_hotspot
    ;;
  activate-hotspot)
    activate_hotspot
    ;;
  scan)
    scan_networks
    ;;
  *)
    echo "Usage: $0 {schedule-connect <ssid>|apply-request|ensure-hotspot|activate-hotspot|scan}" >&2
    exit 2
    ;;
esac
