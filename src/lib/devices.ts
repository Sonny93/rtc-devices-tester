export function getDevicesByKind(
  deviceKind: MediaDeviceInfo['kind'],
  devices?: MediaDeviceInfo[]
) {
  return devices
    ? devices.filter((device) => device.kind === deviceKind)
    : undefined;
}

async function testAndKillMedia(kind: 'audio' | 'video') {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      [kind]: true,
    });
    stream.getTracks().forEach((track) => track.stop());
  } catch (_) {
    // We don't care about errors here.
  }
}

// We have to get stream in order to get labels
// for devices because firefox sucks.
export async function getDevices() {
  await testAndKillMedia('audio');
  await testAndKillMedia('video');
  return await navigator.mediaDevices.enumerateDevices();
}
