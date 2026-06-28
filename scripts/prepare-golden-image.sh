#!/bin/bash

set -euo pipefail

CONFIRM="${1:-}"

if [ "$CONFIRM" != "--yes" ]; then
  cat >&2 <<'EOF'
This prepares the current Pi to become a golden SD-card image.

It removes device identity, local lesson data, saved Wi-Fi credentials, logs,
SSH host keys, and shell history. Run only on the reference card immediately
before shutting down and capturing the image.

Usage:
  sudo scripts/prepare-golden-image.sh --yes
EOF
  exit 2
fi

if [ "$(id -u)" -ne 0 ]; then
  echo "Run with sudo so system identity and NetworkManager state can be cleaned." >&2
  exit 1
fi

find_app_user() {
  if [ -n "${ROSE_APP_USER:-}" ]; then
    printf '%s\n' "$ROSE_APP_USER"
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
STATE_DIR="${ROSE_STATE_DIR:-/var/lib/rose}"
AP_CONNECTION_NAME="${ROSE_AP_CONNECTION_NAME:-pi-ap}"

remove_env_key() {
  local key="$1"

  [ -f "$ENV_FILE" ] || return 0
  sed -i "/^${key}=/d" "$ENV_FILE"
}

verify_removed_env_key() {
  local key="$1"

  [ -f "$ENV_FILE" ] || return 0

  if grep -q "^${key}=" "$ENV_FILE"; then
    echo "Verification failed: $key is still present in $ENV_FILE" >&2
    return 1
  fi
}

verify_cleanup() {
  local failed=0

  echo "Verifying golden image cleanup..."

  verify_removed_env_key "DEVICE_ID" || failed=1
  verify_removed_env_key "NEXT_PUBLIC_DEVICE_ID" || failed=1
  verify_removed_env_key "DEVICE_PAIRING_CODE" || failed=1
  verify_removed_env_key "CLASSROOM_SESSION_SECRET" || failed=1

  if [ -f "$STATE_DIR/first-boot-complete" ]; then
    echo "Verification failed: first-boot marker still exists." >&2
    failed=1
  fi

  if [ -f "$DB_PATH" ] || [ -f "$APP_DIR/rose-academies-uganda.db" ]; then
    echo "Verification failed: local SQLite database still exists." >&2
    failed=1
  fi

  if [ -d "$FILES_DIR" ] && find "$FILES_DIR" -mindepth 1 -maxdepth 1 | grep -q .; then
    echo "Verification failed: synced files still exist in $FILES_DIR" >&2
    failed=1
  fi

  if [ -s /etc/machine-id ]; then
    echo "Verification failed: /etc/machine-id is not empty." >&2
    failed=1
  fi

  if compgen -G "/etc/ssh/ssh_host_*" >/dev/null; then
    echo "Verification failed: SSH host keys still exist." >&2
    failed=1
  fi

  if command -v systemctl >/dev/null 2>&1; then
    if ! systemctl is-enabled rose-first-boot.service >/dev/null 2>&1; then
      echo "Verification failed: rose-first-boot.service is not enabled." >&2
      failed=1
    fi
  fi

  if [ "$failed" -ne 0 ]; then
    echo "Golden image cleanup did not pass verification. Fix the issue above before imaging." >&2
    exit 1
  fi

  echo "Golden image cleanup verification passed."
}

echo "Stopping Rose services..."
systemctl stop rose-web.service >/dev/null 2>&1 || true
systemctl stop rose-wifi-fallback.service >/dev/null 2>&1 || true
systemctl stop rose-first-boot.service >/dev/null 2>&1 || true

echo "Clearing Rose device identity..."
remove_env_key "DEVICE_ID"
remove_env_key "NEXT_PUBLIC_DEVICE_ID"
remove_env_key "DEVICE_PAIRING_CODE"
remove_env_key "CLASSROOM_SESSION_SECRET"

if [ -f "$ENV_FILE" ]; then
  chown "$APP_USER:$APP_USER" "$ENV_FILE"
  chmod 0600 "$ENV_FILE"
fi

echo "Removing local synced classroom data..."
rm -f "$DB_PATH"
rm -f "$APP_DIR/rose-academies-uganda.db"

if [ -d "$FILES_DIR" ] && [ "$FILES_DIR" != "/" ]; then
  find "$FILES_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
fi

echo "Resetting Rose first-boot state..."
mkdir -p "$STATE_DIR"
rm -f "$STATE_DIR/first-boot-complete"
systemctl enable rose-first-boot.service >/dev/null 2>&1 || true

echo "Removing saved Wi-Fi credentials except the Rose setup hotspot..."
if command -v nmcli >/dev/null 2>&1; then
  while IFS=: read -r uuid type name; do
    [ -n "$uuid" ] || continue

    case "$type" in
      wifi|802-11-wireless)
        if [ "$name" != "$AP_CONNECTION_NAME" ]; then
          nmcli connection delete uuid "$uuid" >/dev/null 2>&1 || true
        fi
        ;;
    esac
  done < <(nmcli -t -f UUID,TYPE,NAME connection show)
fi

echo "Clearing Linux machine identity..."
truncate -s 0 /etc/machine-id 2>/dev/null || true
rm -f /var/lib/dbus/machine-id

echo "Removing SSH host keys and disabling SSH for shipped devices..."
rm -f /etc/ssh/ssh_host_*
systemctl disable ssh.service >/dev/null 2>&1 || true
systemctl disable ssh >/dev/null 2>&1 || true

echo "Clearing logs, caches, and shell history..."
journalctl --rotate >/dev/null 2>&1 || true
journalctl --vacuum-time=1s >/dev/null 2>&1 || true
find /var/log -type f -exec truncate -s 0 {} + 2>/dev/null || true
rm -rf /tmp/* /var/tmp/* 2>/dev/null || true
rm -f "$APP_HOME"/.bash_history "$APP_HOME"/.zsh_history /root/.bash_history /root/.zsh_history
rm -rf "$APP_DIR/.next/cache" 2>/dev/null || true

verify_cleanup

echo "Syncing filesystem..."
sync

cat <<EOF
Golden image cleanup complete.

Next:
1. Shut this Pi down.
2. Remove the SD card.
3. Capture and compress the image from another machine.

On the first boot of each copied card, rose-first-boot.service will generate a
unique device ID, pairing code, classroom session secret, and Rose-Setup hotspot.
EOF
