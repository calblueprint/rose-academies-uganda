OS: Debian 13 trixie, 64-bit ARM
Repo: /home/nathantam/rose-academies-uganda
App: /home/nathantam/rose-academies-uganda/apps/local
Files: /home/nathantam/rose-files
Branch: main
Node: v22.21.0
pnpm: 10.20.0
Service: rose-web.service
Port: 80
Runtime: pnpm build, then pnpm start
First boot: rose-first-boot.service generates unique copied-card identity

For repeatable SD-card production, see
[`deployment/golden-image.md`](./golden-image.md).

To provision a feature branch for physical testing without merging it, set
`ROSE_BRANCH` when running the setup script:

```bash
ROSE_BRANCH=feature/pi-wifi-onboarding bash scripts/setup-pi.sh
```

To test files copied directly from a development computer without using Git,
run:

```bash
ROSE_SKIP_GIT=true bash scripts/setup-pi.sh
```

## Educator WiFi onboarding

Provisioned devices create a unique fallback network named
`Rose-Setup-XXXX`, where the suffix is derived from the device ID. The setup
network uses the password `rosehub1` during this MVP.

When the Pi boots somewhere without a saved WiFi connection:

1. Wait up to one minute for the setup network to appear.
2. Join `Rose-Setup-XXXX` from the educator's tablet.
3. Wait for the setup page to open automatically. If it does not, open
   `http://rosehub.local/setup`.
4. Choose a nearby internet WiFi network and enter its password.
5. Wait one minute, reconnect the tablet to that internet network, and open the
   hostname shown on the setup page, such as `http://rosehub.local`.
6. Copy the one-time pairing code from the Classroom Hub setup page.
7. Sign in to the Educator Dashboard, choose **Link Classroom Hub**, and enter
   the code. The Classroom Hub is now connected to that educator account without
   an administrator entering a Supabase device ID.
8. Follow the content step to create or select cloud lessons and choose
   **Sync content now**.
9. Finish only after the wizard confirms that classrooms and lessons are stored
   locally. The final screen shows `http://rosehub.local/join`, the offline hotspot
   name, and a clear offline-ready result.

The readiness result is stricter than a database count: assigned files are read
from disk and checked against the size and SHA-256 metadata saved during sync.
Missing, truncated, unreadable, or modified files block the ready state and are
listed by name so the educator can sync again before traveling.

If the connection or Supabase health check fails, the Pi restores its setup
network and displays the failure on the setup page. The educator can also enter
a hidden network name manually when scanning is unavailable.

The same fallback network serves previously synced lessons when no internet
WiFi is available. Classroom content remains at
`http://rosehub.local/join`.

The captive portal checks the Pi's local SQLite database without contacting the
internet. If no classroom lessons are stored, it opens the educator setup
wizard. Once a classroom and lesson are present, it opens the student join page
instead. The setup wizard remains available through the educator-maintenance
link at the bottom of the join page.

Student join codes are enforced server-side. Each successful join creates a
signed classroom cookie, and lesson metadata plus physical file routes are
scoped to that classroom until the student signs out or the 12-hour session
expires. Different village codes can therefore coexist on one fully synced Pi
without exposing one village's files through another village's session.

For an administrator testing the setup flow while a saved WiFi is available:

```bash
sudo /usr/local/sbin/rose-wifi-manager activate-hotspot
```

This intentionally disconnects the current SSH session. WiFi changes through
the web page are accepted only while the setup hotspot is active.

### MVP limitations

- Captive-portal networks that require accepting terms in a separate browser
  are not supported. The Pi restores its setup hotspot when Supabase cannot be
  reached.
- The setup hotspot password is shared during this MVP. Generate unique device
  passwords before a larger field rollout.
- Some single-radio adapters cannot return scan results while hosting a
  hotspot. Educators can enter the network name manually in that case.

## Supabase device pairing

Run `supabase/migrations/202606190001_device_pairing.sql` once in the Supabase
SQL editor before provisioning devices with automatic registration. The
migration stores only hashes of pairing codes and exposes narrow RPC functions
for device registration and authenticated educator claims.

New installs generate `DEVICE_ID` and `DEVICE_PAIRING_CODE` automatically.
Existing installs retain their current device ID and receive a pairing code the
next time `scripts/setup-pi.sh` runs.

Golden-image installs remove those values before capture. On the first boot of
each copied card, `rose-first-boot.service` recreates `DEVICE_ID`,
`NEXT_PUBLIC_DEVICE_ID`, `DEVICE_PAIRING_CODE`, `CLASSROOM_SESSION_SECRET`, and
the unique `Rose-Setup-XXXX` hotspot name.

### Diagnostics

```bash
sudo systemctl status rose-wifi-fallback --no-pager
sudo systemctl status rose-first-boot --no-pager
sudo journalctl -u rose-first-boot -u rose-wifi-fallback -u rose-web --since "10 minutes ago"
nmcli connection show --active
```
