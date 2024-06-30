import { useMemo } from 'react';
import useDevices from '~/hooks/devices/use_devices';

export default function useMicrophones() {
  const { devices } = useDevices();
  const microphones = useMemo(
    () => devices.filter((device) => device.kind === 'audioinput'),
    [devices]
  );
  return microphones;
}
