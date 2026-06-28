# Rose Portable Classroom Hub Golden Image

This guide creates a repeatable, ready-to-ship SD-card image for Raspberry Pi
devices. The image can be copied many times; each copied Pi creates its own
device identity on first boot.

## What The Golden Image Contains

- Raspberry Pi OS Lite
- Node.js, pnpm, and the Rose local app
- `rose-web.service`
- Wi-Fi fallback and captive portal support
- First-time educator setup wizard
- `rose-first-boot.service`

## What Each Copied Pi Creates On First Boot

`rose-first-boot.service` runs once on each freshly flashed card and creates:

- A unique `DEVICE_ID`
- A unique one-time `DEVICE_PAIRING_CODE`
- A unique `CLASSROOM_SESSION_SECRET`
- A unique `Rose-Setup-XXXX` hotspot name
- An empty local offline SQLite database

The service writes `/var/lib/rose/first-boot-complete` after it succeeds. Later
boots skip the identity step.

## Build The Reference Card

Start from a clean Raspberry Pi OS Lite card and boot the reference Pi.

Run the normal provisioning script:

```bash
bash scripts/setup-pi.sh
```

For a feature branch:

```bash
ROSE_BRANCH=my-branch bash scripts/setup-pi.sh
```

Confirm the app works:

```bash
curl -I http://localhost
sudo systemctl status rose-web --no-pager
sudo systemctl show rose-web -p NoNewPrivileges
sudo systemctl status rose-wifi-fallback --no-pager
sudo systemctl status rose-first-boot --no-pager
```

`NoNewPrivileges` must print `NoNewPrivileges=no`. The Classroom Hub setup page
uses the allowlisted `/usr/local/sbin/rose-wifi-manager` helper through `sudo`;
if this setting is enabled, Wi-Fi setup fails from the browser.

Do not pair this reference card to a real educator account before capturing the
golden image.

## Prepare The Card For Imaging

Immediately before imaging, run:

```bash
sudo scripts/prepare-golden-image.sh --yes
```

The cleanup script removes:

- Device ID and pairing code
- Classroom session secret
- Local synced lessons and files
- Saved internet Wi-Fi credentials
- Linux machine ID
- SSH host keys
- Logs, temporary files, and shell history
- The first-boot completion marker

It also enables `rose-first-boot.service` so copied cards initialize themselves.
Before it finishes, the script verifies that identity, local data, machine ID,
SSH host keys, and first-boot state were removed. If verification fails, do not
capture the image; fix the reported item and run the cleanup again.

Shut down after cleanup:

```bash
sudo shutdown now
```

## Capture And Compress The Image

Move the SD card to a development computer and identify the disk device.

On macOS, this is typically:

```bash
diskutil list
diskutil unmountDisk /dev/diskN
sudo dd if=/dev/rdiskN bs=4m status=progress | xz -T0 -9 > rose-classroom-hub-v1.0.img.xz
```

Replace `diskN` with the actual SD-card disk. Be careful: choosing the wrong
disk can overwrite or read the wrong drive.

## Flash A Copy

Use Raspberry Pi Imager or another imaging tool to flash:

```text
rose-classroom-hub-v1.0.img.xz
```

Do not use Raspberry Pi Imager settings that preconfigure Wi-Fi, hostname, or
SSH for shipped devices unless you intentionally want to override the Rose
first-boot flow.

## Acceptance Test

For each release image:

1. Flash the image to a fresh SD card.
2. Insert it into a different Raspberry Pi.
3. Boot without internet.
4. Confirm a `Rose-Setup-XXXX` network appears.
5. Join that network from a tablet.
6. Open `http://rosehub.local/setup`.
7. Connect the Pi to an internet Wi-Fi network from the setup page.
8. Confirm the setup wizard shows a unique pairing code.
9. Pair the Pi to an educator account.
10. Sync at least one classroom lesson.
11. Reboot without internet.
12. Confirm students land on `/join`.
13. Enter the classroom join code and confirm only that classroom's lessons and
    files appear.

## Security Notes

- SSH is disabled by the cleanup script for shipped images.
- SSH host keys are removed so copied devices do not share host identity.
- Supabase service-role keys must never be placed on the image.
- The MVP hotspot password is still shared as `rosehub1`; use unique
  per-device hotspot passwords or QR labels before larger deployment.
