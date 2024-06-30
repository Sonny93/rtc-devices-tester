import { useMemo } from 'react';
import useDevices from '~/hooks/devices/use_devices';

export default function useCameras() {
  const { devices } = useDevices();
  const cameras = useMemo(
    () => devices.filter((device) => device.kind === 'videoinput'),
    [devices]
  );
  return cameras;
}
