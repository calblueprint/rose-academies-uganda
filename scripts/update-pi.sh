#!/bin/bash
set -euo pipefail

REPO_DIR="${ROSE_REPO_DIR:-$HOME/rose-academies-uganda}"
APP_DIR="$REPO_DIR/apps/local"
PNPM_CMD="corepack pnpm"

cd "$REPO_DIR"

git switch main
git pull --ff-only origin main
CI=true $PNPM_CMD install
sudo apt update
sudo apt install -y iw

cd "$APP_DIR"
$PNPM_CMD build

sudo install -m 0755 \
  "$REPO_DIR/scripts/rose-wifi-manager.sh" \
  /usr/local/sbin/rose-wifi-manager

sudo install -m 0755 \
  "$REPO_DIR/scripts/rose-ap-interface.sh" \
  /usr/local/sbin/rose-ap-interface

sudo install -m 0755 \
  "$REPO_DIR/scripts/rose-first-boot.sh" \
  /usr/local/sbin/rose-first-boot

sudo tee /etc/sysctl.d/90-rose-web-port.conf > /dev/null <<'EOF'
net.ipv4.ip_unprivileged_port_start=80
EOF
sudo sysctl --system >/dev/null

sudo mkdir -p /etc/systemd/system/rose-web.service.d
sudo tee /etc/systemd/system/rose-web.service.d/allow-wifi-sudo.conf > /dev/null <<'EOF'
[Service]
# The setup page calls the narrowly-allowlisted Wi-Fi helper through sudo.
# NoNewPrivileges blocks sudo from elevating, so keep it disabled for this
# service. Restore the full default capability bounding set for older installs
# that limited the service to CAP_NET_BIND_SERVICE.
NoNewPrivileges=false
AmbientCapabilities=
CapabilityBoundingSet=~
EOF

sudo tee /etc/systemd/system/rose-first-boot.service > /dev/null <<'EOF'
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

sudo tee /etc/systemd/system/rose-ap-interface.service > /dev/null <<'EOF'
[Unit]
Description=Create Rose setup hotspot WiFi interface
After=sys-subsystem-net-devices-wlan0.device
Wants=sys-subsystem-net-devices-wlan0.device
Before=NetworkManager.service rose-wifi-fallback.service

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/rose-ap-interface
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now rose-ap-interface.service
sudo systemctl enable rose-first-boot.service

sudo systemctl restart rose-web
sudo systemctl status rose-web --no-pager
