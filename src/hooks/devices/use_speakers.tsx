import { useMemo } from 'react';
import useDevices from '~/hooks/devices/use_devices';

export default function useSpeakers() {
  const { devices } = useDevices();
  const speakers = useMemo(
    () => devices.filter((device) => device.kind === 'audiooutput'),
    [devices]
  );
  return speakers;
}
