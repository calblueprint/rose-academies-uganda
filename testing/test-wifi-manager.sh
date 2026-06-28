#!/bin/bash

set -euo pipefail

REPO_DIR=$(cd "$(dirname "$0")/.." && pwd)
HELPER="$REPO_DIR/scripts/rose-wifi-manager.sh"
TEST_DIR=$(mktemp -d)

trap 'rm -rf "$TEST_DIR"' EXIT

export ROSE_WIFI_REQUEST_FILE="$TEST_DIR/request"
export ROSE_WIFI_STATE_DIR="$TEST_DIR/state"
export ROSE_WIFI_WAIT_ATTEMPTS=1
export ROSE_WIFI_WAIT_SECONDS=0
export MOCK_NMCLI_LOG="$TEST_DIR/nmcli.log"
export MOCK_SYSTEMD_LOG="$TEST_DIR/systemd.log"
export MOCK_CONNECT_FAILURE=0
export MOCK_CURL_FAILURE=0
export MOCK_SYSTEMD_FAILURE=0

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

assert_contains() {
  local file="$1"
  local expected="$2"
  grep -Fq "$expected" "$file" || fail "Expected '$expected' in $file"
}

reset_test() {
  rm -rf "$ROSE_WIFI_STATE_DIR"
  rm -f "$ROSE_WIFI_REQUEST_FILE" "$MOCK_NMCLI_LOG" "$MOCK_SYSTEMD_LOG"
  export MOCK_CONNECT_FAILURE=0
  export MOCK_CURL_FAILURE=0
  export MOCK_SYSTEMD_FAILURE=0
}

write_request() {
  printf '%s\n%s\n%s\n' "$1" "$2" "$3" > "$ROSE_WIFI_REQUEST_FILE"
}

nmcli() {
  printf '%s\n' "$*" >> "$MOCK_NMCLI_LOG"

  if [[ "$*" == *"device wifi connect"* ]] && [ "$MOCK_CONNECT_FAILURE" = "1" ]; then
    return 10
  fi

  if [[ "$*" == *"--get-values GENERAL.CONNECTION"* ]]; then
    printf '%s\n' "--"
  fi

  return 0
}

curl() {
  [ "$MOCK_CURL_FAILURE" = "0" ]
}

systemd-run() {
  printf '%s\n' "$*" >> "$MOCK_SYSTEMD_LOG"
  [ "$MOCK_SYSTEMD_FAILURE" = "0" ]
}

sha256sum() {
  # The helper only needs a stable hash for a deterministic connection name.
  command cat >/dev/null
  printf '%064d  -\n' 0
}

export -f nmcli curl systemd-run sha256sum

reset_test
printf '%s\n' "correct-password" |
  bash "$HELPER" schedule-connect "School WiFi" no
assert_contains "$ROSE_WIFI_REQUEST_FILE" "School WiFi"
assert_contains "$ROSE_WIFI_STATE_DIR/last-result" $'pending\tSchool WiFi'
assert_contains "$MOCK_SYSTEMD_LOG" "apply-request"

reset_test
export MOCK_SYSTEMD_FAILURE=1
if printf '%s\n' "correct-password" |
  bash "$HELPER" schedule-connect "School WiFi" no; then
  fail "A failed systemd schedule unexpectedly succeeded"
fi
[ ! -e "$ROSE_WIFI_REQUEST_FILE" ] || fail "Failed schedule left credentials behind"
assert_contains "$ROSE_WIFI_STATE_DIR/last-result" "Unable to schedule"

reset_test
write_request "School WiFi" "correct-password" "no"
bash "$HELPER" apply-request
assert_contains "$ROSE_WIFI_STATE_DIR/last-result" $'success\tSchool WiFi'
assert_contains "$MOCK_NMCLI_LOG" "connection.autoconnect-priority 10"

reset_test
export MOCK_CONNECT_FAILURE=1
write_request "School WiFi" "wrong-password" "no"
if bash "$HELPER" apply-request; then
  fail "A failed WiFi connection unexpectedly succeeded"
fi
assert_contains "$ROSE_WIFI_STATE_DIR/last-result" $'failure\tThe Pi could not join School WiFi'
assert_contains "$MOCK_NMCLI_LOG" "connection up pi-ap"

reset_test
export MOCK_CURL_FAILURE=1
write_request "School WiFi" "correct-password" "yes"
if bash "$HELPER" apply-request; then
  fail "An unreachable Supabase host unexpectedly succeeded"
fi
assert_contains "$ROSE_WIFI_STATE_DIR/last-result" "Supabase was unreachable"
assert_contains "$MOCK_NMCLI_LOG" "connection delete rose-wifi-"
assert_contains "$MOCK_NMCLI_LOG" "connection up pi-ap"

reset_test
bash "$HELPER" ensure-hotspot
assert_contains "$MOCK_NMCLI_LOG" "connection up pi-ap"

echo "WiFi manager workflow tests passed."
