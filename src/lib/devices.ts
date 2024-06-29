export function getDevicesByKind(
  deviceKind: MediaDeviceInfo['kind'],
  devices?: MediaDeviceInfo[]
) {
  return devices
    ? devices.filter((device) => device.kind === deviceKind)
    : undefined;
}

export async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();

  return devices;
}
