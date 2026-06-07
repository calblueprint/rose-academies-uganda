export function getDeviceId() {
  // The local Pi uses the same device id for polling, syncing, and storage
  // reporting so cloud DeviceLessons rows map to one physical device.

  // Set this in env.local
  const deviceId =
    process.env.DEVICE_ID?.trim() ?? process.env.NEXT_PUBLIC_DEVICE_ID?.trim();

  if (!deviceId) {
    throw new Error(
      "Missing device id environment variable. Set DEVICE_ID and NEXT_PUBLIC_DEVICE_ID in apps/local/.env.local.",
    );
  }

  return deviceId;
}
