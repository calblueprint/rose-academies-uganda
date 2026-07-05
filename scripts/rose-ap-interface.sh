#!/bin/bash

set -euo pipefail

WIFI_INTERFACE="${ROSE_WIFI_INTERFACE:-wlan0}"
AP_INTERFACE="${ROSE_AP_INTERFACE:-roseap0}"
IW_BIN="${ROSE_IW_BIN:-}"

if [ -z "$IW_BIN" ]; then
  if [ -x /usr/sbin/iw ]; then
    IW_BIN="/usr/sbin/iw"
  else
    IW_BIN="$(command -v iw || true)"
  fi
fi

if ip link show "$AP_INTERFACE" >/dev/null 2>&1; then
  exit 0
fi

if [ -z "$IW_BIN" ]; then
  echo "iw is not installed; cannot create $AP_INTERFACE." >&2
  exit 1
fi

if ! ip link show "$WIFI_INTERFACE" >/dev/null 2>&1; then
  echo "$WIFI_INTERFACE is not available; cannot create $AP_INTERFACE." >&2
  exit 1
fi

"$IW_BIN" dev "$WIFI_INTERFACE" interface add "$AP_INTERFACE" type __ap
ip link set "$AP_INTERFACE" up
