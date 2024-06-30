export function getDevicesByKind(
  deviceKind: MediaDeviceInfo['kind'],
  devices?: MediaDeviceInfo[]
) {
  return devices
    ? devices.filter((device) => device.kind === deviceKind)
    : undefined;
}

export async function getDevices() {
  // We have to get stream in order to get labels
  // for devices because firefox sucks.
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  const devices = await navigator.mediaDevices.enumerateDevices();
  stream.getTracks().forEach((track) => track.stop());
  return devices;
}
