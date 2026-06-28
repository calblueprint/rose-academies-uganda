#!/bin/bash
set -euo pipefail

REPO_DIR="${ROSE_REPO_DIR:-$HOME/rose-academies-uganda}"
APP_DIR="$REPO_DIR/apps/local"
PNPM_CMD="corepack pnpm"

cd "$REPO_DIR"

git switch main
git pull --ff-only origin main
CI=true $PNPM_CMD install

cd "$APP_DIR"
$PNPM_CMD build

sudo install -m 0755 \
  "$REPO_DIR/scripts/rose-wifi-manager.sh" \
  /usr/local/sbin/rose-wifi-manager

sudo install -m 0755 \
  "$REPO_DIR/scripts/rose-first-boot.sh" \
  /usr/local/sbin/rose-first-boot

sudo mkdir -p /etc/systemd/system/rose-web.service.d
sudo tee /etc/systemd/system/rose-web.service.d/allow-wifi-sudo.conf > /dev/null <<'EOF'
[Service]
# The setup page calls the narrowly-allowlisted Wi-Fi helper through sudo.
# NoNewPrivileges blocks sudo from elevating, so keep it disabled for this
# service until the helper is moved behind a root-owned system service.
NoNewPrivileges=false
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

sudo systemctl daemon-reload
sudo systemctl enable rose-first-boot.service

sudo systemctl restart rose-web
sudo systemctl status rose-web --no-pager
