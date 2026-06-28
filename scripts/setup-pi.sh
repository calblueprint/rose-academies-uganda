#!/bin/bash

set -euo pipefail

REPO_URL="https://github.com/calblueprint/rose-academies-uganda.git"
REPO_DIR="$HOME/rose-academies-uganda"
APP_DIR="$REPO_DIR/apps/local"
FILES_DIR="$HOME/rose-files"
SERVICE_NAME="rose-web"
PNPM_VERSION="10.20.0"
BRANCH="${ROSE_BRANCH:-main}"
SKIP_GIT="${ROSE_SKIP_GIT:-false}"

AP_CONNECTION_NAME="pi-ap"
AP_PASSWORD="${ROSE_AP_PASSWORD:-rosehub1}"

SUPABASE_URL="https://tyckvrwfblheqxuliscl.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5Y2t2cndmYmxoZXF4dWxpc2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzIwNTksImV4cCI6MjA3NDc0ODA1OX0.dggjzvmAdwHif9v3hUZWrYdwOFPfZAPMO9BHGlPaqPg"

echo "Setting up Rose Academies Pi..."

read_env_value() {
  local key="$1"
  local file="$2"

  [ -f "$file" ] || return 0
  sed -n "s/^${key}=//p" "$file" | head -n 1
}

random_pairing_code() {
  local alphabet="ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  local code=""
  local byte
  local index

  while [ "${#code}" -lt 8 ]; do
    byte=$(od -An -N1 -tu1 /dev/urandom | tr -d ' ')
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

EXISTING_DEVICE_ID=$(read_env_value "DEVICE_ID" "$APP_DIR/.env.local")
EXISTING_PAIRING_CODE=$(read_env_value "DEVICE_PAIRING_CODE" "$APP_DIR/.env.local")
EXISTING_CLASSROOM_SESSION_SECRET=$(read_env_value "CLASSROOM_SESSION_SECRET" "$APP_DIR/.env.local")

# Existing installations keep their current ID. New cards create a stable,
# unguessable ID automatically so an educator never has to copy a Supabase ID.
DEVICE_ID="${ROSE_DEVICE_ID:-$EXISTING_DEVICE_ID}"

if [ -z "$DEVICE_ID" ]; then
  DEVICE_ID="rose-$(cat /proc/sys/kernel/random/uuid)"
fi

if [ -z "$DEVICE_ID" ]; then
  echo "Unable to create a device ID."
  exit 1
fi

DEVICE_PAIRING_CODE="${ROSE_DEVICE_PAIRING_CODE:-$EXISTING_PAIRING_CODE}"

if [ -z "$DEVICE_PAIRING_CODE" ]; then
  DEVICE_PAIRING_CODE=$(random_pairing_code)
fi

if [[ ! "$DEVICE_PAIRING_CODE" =~ ^([A-Z0-9]{8}|[A-F0-9]{12})$ ]]; then
  echo "DEVICE_PAIRING_CODE must contain 8 letters/numbers or an older 12-character hexadecimal code."
  exit 1
fi

CLASSROOM_SESSION_SECRET="${ROSE_CLASSROOM_SESSION_SECRET:-$EXISTING_CLASSROOM_SESSION_SECRET}"

if [ -z "$CLASSROOM_SESSION_SECRET" ]; then
  CLASSROOM_SESSION_SECRET="$(tr -d '-' < /proc/sys/kernel/random/uuid)$(tr -d '-' < /proc/sys/kernel/random/uuid)"
fi

if [[ ! "$CLASSROOM_SESSION_SECRET" =~ ^[A-Fa-f0-9]{64}$ ]]; then
  echo "CLASSROOM_SESSION_SECRET must contain exactly 64 hexadecimal characters."
  exit 1
fi

DEVICE_SUFFIX=$(printf '%s' "$DEVICE_ID" | sha256sum | cut -c1-4 | tr '[:lower:]' '[:upper:]')
AP_SSID="Rose-Setup-$DEVICE_SUFFIX"

echo "Device ID: $DEVICE_ID"
echo "This Pi's setup and offline WiFi will be: $AP_SSID"

echo "Updating system packages..."
sudo apt update
sudo apt install -y \
  git \
  curl \
  build-essential \
  ca-certificates \
  network-manager \
  dnsmasq-base \
  avahi-daemon \
  libnss-mdns

echo "Configuring Classroom Hub hostname..."
sudo hostnamectl set-hostname rosehub
sudo sed -i '/127\.0\.1\.1/d' /etc/hosts
printf '127.0.1.1 rosehub\n' | sudo tee -a /etc/hosts >/dev/null

echo "Configuring WiFi access point fallback..."

if nmcli connection show "$AP_CONNECTION_NAME" >/dev/null 2>&1; then
  echo "AP connection already exists. Updating it..."
else
  echo "Creating AP connection..."
  sudo nmcli connection add \
    type wifi \
    ifname wlan0 \
    con-name "$AP_CONNECTION_NAME" \
    autoconnect yes \
    ssid "$AP_SSID"
fi

sudo nmcli connection modify "$AP_CONNECTION_NAME" \
  802-11-wireless.ssid "$AP_SSID" \
  802-11-wireless.mode ap \
  802-11-wireless.band bg \
  ipv4.method shared \
  wifi-sec.key-mgmt wpa-psk \
  wifi-sec.psk "$AP_PASSWORD" \
  connection.autoconnect yes \
  connection.autoconnect-priority 0

echo "Configuring captive portal DNS..."

sudo mkdir -p /etc/NetworkManager/dnsmasq-shared.d
sudo tee /etc/NetworkManager/dnsmasq-shared.d/rose-captive-portal.conf \
  > /dev/null <<EOF
# Resolve every name to the Pi while its isolated setup hotspot is active.
address=/#/10.42.0.1
# RFC 8910 captive-portal URL advertised through DHCP option 114.
dhcp-option=114,http://10.42.0.1/captive-portal/api
EOF

sudo systemctl enable --now avahi-daemon

echo "Setting normal WiFi connections to higher priority than AP..."

AP_UUID=$(nmcli --get-values connection.uuid connection show "$AP_CONNECTION_NAME")
WIFI_CONNECTIONS=$(nmcli -t -f UUID,TYPE connection show | awk -F: '$2=="802-11-wireless" || $2=="wifi"{print $1}')

for CONN_UUID in $WIFI_CONNECTIONS; do
  if [ "$CONN_UUID" != "$AP_UUID" ]; then
    echo "Setting WiFi priority for $CONN_UUID..."
    sudo nmcli connection modify uuid "$CONN_UUID" \
      connection.autoconnect yes \
      connection.autoconnect-priority 10
  fi
done

echo "Checking Node installation..."

if ! command -v node >/dev/null 2>&1; then
  echo "Installing Node.js 22..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
fi

echo "Node version:"
node -v

echo "Configuring pnpm $PNPM_VERSION with Corepack..."
sudo corepack enable
corepack prepare "pnpm@$PNPM_VERSION" --activate

PNPM_CMD="corepack pnpm"

echo "pnpm version:"
$PNPM_CMD -v

echo "Preparing folders..."
mkdir -p "$FILES_DIR"

if [ ! -d "$REPO_DIR" ]; then
  echo "Cloning repo..."
  git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"

if [ "$SKIP_GIT" = "true" ]; then
  echo "Using locally copied repository files; skipping Git update."
else
  echo "Checking out $BRANCH..."
  git fetch origin "$BRANCH"
  git switch "$BRANCH" || git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
fi

echo "Preparing local environment..."
touch "$APP_DIR/.env.local"

ensure_env_value() {
  local key="$1"
  local value="$2"

  if ! grep -q "^${key}=" "$APP_DIR/.env.local"; then
    printf '%s=%s\n' "$key" "$value" >> "$APP_DIR/.env.local"
  fi
}

ensure_env_value "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
ensure_env_value "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"
ensure_env_value "DEVICE_ID" "$DEVICE_ID"
ensure_env_value "NEXT_PUBLIC_DEVICE_ID" "$DEVICE_ID"
ensure_env_value "DEVICE_PAIRING_CODE" "$DEVICE_PAIRING_CODE"
ensure_env_value "CLASSROOM_SESSION_SECRET" "$CLASSROOM_SESSION_SECRET"
ensure_env_value "LOCAL_FILES_DIR" "$FILES_DIR"
ensure_env_value "LOCAL_REPO_DIR" "$REPO_DIR"

echo "Installing project dependencies..."
CI=true $PNPM_CMD install

echo "Building local app..."
cd "$APP_DIR"
$PNPM_CMD build

echo "Installing WiFi onboarding helper..."

sudo install -m 0755 \
  "$REPO_DIR/scripts/rose-wifi-manager.sh" \
  /usr/local/sbin/rose-wifi-manager

sudo install -m 0755 \
  "$REPO_DIR/scripts/rose-first-boot.sh" \
  /usr/local/sbin/rose-first-boot

SUDOERS_TMP=$(mktemp)
printf '%s ALL=(root) NOPASSWD: /usr/local/sbin/rose-wifi-manager *\n' \
  "$USER" > "$SUDOERS_TMP"
sudo visudo -cf "$SUDOERS_TMP"
sudo install -m 0440 "$SUDOERS_TMP" /etc/sudoers.d/rose-wifi-manager
rm -f "$SUDOERS_TMP"

echo "Installing WiFi fallback service..."

sudo tee /etc/systemd/system/rose-first-boot.service > /dev/null <<EOF
[Unit]
Description=Initialize unique Rose identity on first boot
After=local-fs.target NetworkManager.service
Wants=NetworkManager.service
Before=rose-web.service rose-wifi-fallback.service
ConditionPathExists=!/var/lib/rose/first-boot-complete

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/rose-first-boot
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

sudo tee /etc/systemd/system/rose-wifi-fallback.service > /dev/null <<EOF
[Unit]
Description=Start Rose setup hotspot when no saved WiFi is available
After=NetworkManager.service rose-first-boot.service
Wants=NetworkManager.service rose-first-boot.service

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/rose-wifi-manager ensure-hotspot

[Install]
WantedBy=multi-user.target
EOF

echo "Installing systemd service..."

sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null <<EOF
[Unit]
Description=Rose Academies Next.js app
After=network.target rose-first-boot.service
Wants=rose-first-boot.service

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
Environment="LOCAL_FILES_DIR=$FILES_DIR"
Environment="PORT=80"
AmbientCapabilities=CAP_NET_BIND_SERVICE
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
# The setup page calls the narrowly-allowlisted Wi-Fi helper through sudo.
# NoNewPrivileges blocks sudo from elevating, so keep it disabled for this
# service until the helper is moved behind a root-owned system service.
NoNewPrivileges=false
ExecStart=/usr/bin/bash -lc 'cd $APP_DIR && corepack pnpm start'
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

echo "Starting service..."

sudo systemctl daemon-reload
sudo systemctl enable rose-first-boot.service
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl enable --now rose-wifi-fallback.service
sudo systemctl restart "$SERVICE_NAME"

echo "Waiting for local app..."
sleep 5

echo "Testing local app..."

curl -I http://localhost || {
  echo "Local app did not respond."
  exit 1
}

echo "Setup complete."

echo "WiFi onboarding page: http://rosehub.local/setup"
echo "Fallback hotspot: $AP_SSID"
echo "Fallback hotspot password: $AP_PASSWORD"
echo "Educator pairing code: $(format_pairing_code "$DEVICE_PAIRING_CODE")"

sudo systemctl status "$SERVICE_NAME" --no-pager
