#!/bin/bash

set -euo pipefail

STATE_DIR="${ROSE_STATE_DIR:-/var/lib/rose}"
FIRST_BOOT_MARKER="$STATE_DIR/first-boot-complete"
AP_CONNECTION_NAME="${ROSE_AP_CONNECTION_NAME:-pi-ap}"
AP_PASSWORD="${ROSE_AP_PASSWORD:-rosehub1}"
DEFAULT_SUPABASE_URL="https://tyckvrwfblheqxuliscl.supabase.co"
DEFAULT_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5Y2t2cndmYmxoZXF4dWxpc2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzIwNTksImV4cCI6MjA3NDc0ODA1OX0.dggjzvmAdwHif9v3hUZWrYdwOFPfZAPMO9BHGlPaqPg"

find_app_user() {
  if [ -n "${ROSE_APP_USER:-}" ]; then
    printf '%s\n' "$ROSE_APP_USER"
    return
  fi

  if [ -n "${SUDO_USER:-}" ] && [ "$SUDO_USER" != "root" ]; then
    printf '%s\n' "$SUDO_USER"
    return
  fi

  awk -F: '$3 >= 1000 && $3 < 60000 && $1 != "nobody" { print $1; exit }' /etc/passwd
}

APP_USER="$(find_app_user)"

if [ -z "$APP_USER" ] || ! id "$APP_USER" >/dev/null 2>&1; then
  echo "Unable to determine Rose app user. Set ROSE_APP_USER and run again." >&2
  exit 1
fi

APP_HOME="$(getent passwd "$APP_USER" | cut -d: -f6)"
REPO_DIR="${ROSE_REPO_DIR:-$APP_HOME/rose-academies-uganda}"
APP_DIR="${ROSE_APP_DIR:-$REPO_DIR/apps/local}"
FILES_DIR="${ROSE_FILES_DIR:-$APP_HOME/rose-files}"
ENV_FILE="$APP_DIR/.env.local"
DB_PATH="${ROSE_DB_PATH:-$APP_DIR/rose-academies-uganda.db}"

if [ -f "$FIRST_BOOT_MARKER" ]; then
  echo "Rose first boot already completed."
  exit 0
fi

if [ ! -d "$APP_DIR" ]; then
  echo "Rose local app directory not found: $APP_DIR" >&2
  exit 1
fi

random_hex() {
  local bytes="$1"
  od -An -N "$bytes" -tx1 /dev/urandom | tr -d ' \n' | tr '[:lower:]' '[:upper:]'
}

random_pairing_code() {
  local alphabet="ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  local code=""
  local byte
  local index

  while [ "${#code}" -lt 8 ]; do
    byte="$(od -An -N1 -tu1 /dev/urandom | tr -d ' ')"
    index=$((byte % ${#alphabet}))
    code="${code}${alphabet:index:1}"
  done

  printf '%s\n' "$code"
}

format_pairing_code() {
  local code="$1"

  if [ "${#code}" -eq 8 ]; then
    printf '%s-%s\n' "${code:0:4}" "${code:4:4}"
    return
  fi

  printf '%s-%s\n' "${code:0:6}" "${code:6:6}"
}

random_uuid() {
  if [ -r /proc/sys/kernel/random/uuid ]; then
    cat /proc/sys/kernel/random/uuid
    return
  fi

  if command -v uuidgen >/dev/null 2>&1; then
    uuidgen | tr '[:upper:]' '[:lower:]'
    return
  fi

  printf '%s-%s\n' "$(date +%s)" "$(random_hex 8 | tr '[:upper:]' '[:lower:]')"
}

read_env_value() {
  local key="$1"

  [ -f "$ENV_FILE" ] || return 0
  sed -n "s/^${key}=//p" "$ENV_FILE" | head -n 1
}

set_env_value() {
  local key="$1"
  local value="$2"

  touch "$ENV_FILE"
  sed -i "/^${key}=/d" "$ENV_FILE"
  printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
}

mkdir -p "$STATE_DIR" "$FILES_DIR" "$(dirname "$ENV_FILE")"
touch "$ENV_FILE"

DEVICE_ID="${ROSE_DEVICE_ID:-$(read_env_value DEVICE_ID)}"
if [ -z "$DEVICE_ID" ]; then
  DEVICE_ID="rose-$(random_uuid)"
fi

DEVICE_PAIRING_CODE="${ROSE_DEVICE_PAIRING_CODE:-$(read_env_value DEVICE_PAIRING_CODE)}"
if [ -z "$DEVICE_PAIRING_CODE" ]; then
  DEVICE_PAIRING_CODE="$(random_pairing_code)"
fi

CLASSROOM_SESSION_SECRET="${ROSE_CLASSROOM_SESSION_SECRET:-$(read_env_value CLASSROOM_SESSION_SECRET)}"
if [ -z "$CLASSROOM_SESSION_SECRET" ]; then
  CLASSROOM_SESSION_SECRET="$(random_hex 32)"
fi

SUPABASE_URL="${ROSE_SUPABASE_URL:-$(read_env_value NEXT_PUBLIC_SUPABASE_URL)}"
if [ -z "$SUPABASE_URL" ]; then
  SUPABASE_URL="$DEFAULT_SUPABASE_URL"
fi

SUPABASE_ANON_KEY="${ROSE_SUPABASE_ANON_KEY:-$(read_env_value NEXT_PUBLIC_SUPABASE_ANON_KEY)}"
if [ -z "$SUPABASE_ANON_KEY" ]; then
  SUPABASE_ANON_KEY="$DEFAULT_SUPABASE_ANON_KEY"
fi

if [[ ! "$DEVICE_PAIRING_CODE" =~ ^([A-Z0-9]{8}|[A-F0-9]{12})$ ]]; then
  echo "DEVICE_PAIRING_CODE must contain 8 letters/numbers or an older 12-character hexadecimal code." >&2
  exit 1
fi

if [[ ! "$CLASSROOM_SESSION_SECRET" =~ ^[A-Fa-f0-9]{64}$ ]]; then
  echo "CLASSROOM_SESSION_SECRET must contain exactly 64 hexadecimal characters." >&2
  exit 1
fi

DEVICE_SUFFIX="$(printf '%s' "$DEVICE_ID" | sha256sum | cut -c1-4 | tr '[:lower:]' '[:upper:]')"
AP_SSID="Rose-Setup-$DEVICE_SUFFIX"

echo "Preparing Rose first boot identity..."
echo "Device ID: $DEVICE_ID"
echo "Setup hotspot: $AP_SSID"

set_env_value "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
set_env_value "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"
set_env_value "DEVICE_ID" "$DEVICE_ID"
set_env_value "NEXT_PUBLIC_DEVICE_ID" "$DEVICE_ID"
set_env_value "DEVICE_PAIRING_CODE" "$DEVICE_PAIRING_CODE"
set_env_value "CLASSROOM_SESSION_SECRET" "$CLASSROOM_SESSION_SECRET"
set_env_value "LOCAL_FILES_DIR" "$FILES_DIR"
set_env_value "LOCAL_REPO_DIR" "$REPO_DIR"

chown "$APP_USER:$APP_USER" "$ENV_FILE"
chmod 0600 "$ENV_FILE"
chown -R "$APP_USER:$APP_USER" "$FILES_DIR"

if command -v nmcli >/dev/null 2>&1; then
  echo "Configuring Rose setup hotspot..."

  if nmcli connection show "$AP_CONNECTION_NAME" >/dev/null 2>&1; then
    nmcli connection modify "$AP_CONNECTION_NAME" 802-11-wireless.ssid "$AP_SSID"
  else
    nmcli connection add \
      type wifi \
      ifname wlan0 \
      con-name "$AP_CONNECTION_NAME" \
      autoconnect yes \
      ssid "$AP_SSID"
  fi

  nmcli connection modify "$AP_CONNECTION_NAME" \
    802-11-wireless.ssid "$AP_SSID" \
    802-11-wireless.mode ap \
    802-11-wireless.band bg \
    ipv4.method shared \
    wifi-sec.key-mgmt wpa-psk \
    wifi-sec.psk "$AP_PASSWORD" \
    connection.autoconnect yes \
    connection.autoconnect-priority 0
else
  echo "nmcli not found; skipping hotspot configuration." >&2
fi

echo "Initializing empty Rose offline database..."
INIT_DB_SCRIPT="$(mktemp "$APP_DIR/.rose-first-boot-init.XXXXXX.js")"
trap 'rm -f "$INIT_DB_SCRIPT"' EXIT
cat > "$INIT_DB_SCRIPT" <<'NODE'
const path = require("path");
const Database = require("better-sqlite3");

const dbPath = process.env.ROSE_DB_PATH || path.join(process.cwd(), "rose-academies-uganda.db");
const db = new Database(dbPath);

const statements = [
  `CREATE TABLE IF NOT EXISTS lesson_files (
    lesson_id INTEGER NOT NULL,
    file_id INTEGER NOT NULL,
    PRIMARY KEY (lesson_id, file_id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    FOREIGN KEY (file_id) REFERENCES files(id)
  )`,
  `CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY,
    name TEXT,
    join_code TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    image_path TEXT,
    group_id INTEGER,
    FOREIGN KEY (group_id) REFERENCES groups(id)
  )`,
  `CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY,
    name TEXT,
    size_bytes INTEGER,
    storage_path TEXT,
    hash TEXT,
    created_at TEXT,
    updated_at TEXT,
    lesson_id INTEGER,
    mime_type TEXT,
    local_path TEXT,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
  )`,
  `CREATE TABLE IF NOT EXISTS sync_runs (
    id INTEGER PRIMARY KEY,
    started_at TEXT NOT NULL,
    finished_at TEXT,
    status TEXT NOT NULL
  )`,
];

for (const statement of statements) {
  db.prepare(statement).run();
}

db.close();
NODE
chmod 0644 "$INIT_DB_SCRIPT"

if command -v runuser >/dev/null 2>&1; then
  runuser -u "$APP_USER" -- bash -lc "cd '$APP_DIR' && ROSE_DB_PATH='$DB_PATH' node '$INIT_DB_SCRIPT'"
else
  su - "$APP_USER" -c "cd '$APP_DIR' && ROSE_DB_PATH='$DB_PATH' node '$INIT_DB_SCRIPT'"
fi

rm -f "$INIT_DB_SCRIPT"
trap - EXIT
chown "$APP_USER:$APP_USER" "$DB_PATH" 2>/dev/null || true

if command -v systemctl >/dev/null 2>&1; then
  systemctl enable rose-web.service >/dev/null 2>&1 || true
  systemctl enable rose-wifi-fallback.service >/dev/null 2>&1 || true
fi

if [ -x /usr/local/sbin/rose-wifi-manager ]; then
  /usr/local/sbin/rose-wifi-manager ensure-hotspot || true
fi

date -u +"%Y-%m-%dT%H:%M:%SZ" > "$FIRST_BOOT_MARKER"

echo "Rose first boot complete."
echo "Educator pairing code: $(format_pairing_code "$DEVICE_PAIRING_CODE")"
