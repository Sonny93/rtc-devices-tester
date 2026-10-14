import { Select } from '@minimalstuff/ui';
import { type ChangeEvent, useEffect } from 'react';
import SettingSwitch from '#/components/common/setting_switch';
import { Devices } from '#/contexts/devices_context';
import usePermissions from '#/hooks/permissions/use_permissions';
import useStream from '#/hooks/stream/use_stream';
import useSettings from '#/hooks/use_settings';
import useShouldCheckPermission from '#/hooks/use_should_check_permissions';
import { capitalize } from '#/lib/string';

type DeviceSelectorProps = Readonly<{
  type: 'video' | 'microphone' | 'speaker';
  devices: Devices;
  permissionName: string;
  selectedDevice: MediaDeviceInfo;
  onDeviceChange: (device: MediaDeviceInfo) => void;
}>;

export default function DeviceSelector({
  type,
  permissionName,
  devices,
  selectedDevice,
  onDeviceChange,
}: DeviceSelectorProps) {
  const shouldCheckPermission = useShouldCheckPermission();
  const permissionState = usePermissions(permissionName);
  const { stream, stopStream } = useStream();
  const { settings } = useSettings();

  const handleChangeDevice = (event: ChangeEvent<HTMLSelectElement>) => {
    const device = devices.find(({ deviceId }) => deviceId === event.target.value);
    if (device) onDeviceChange(device);
  };

  useEffect(() => {
    if (stream && shouldCheckPermission && permissionState !== 'granted') {
      stopStream();
    }
  }, [permissionState, shouldCheckPermission, stopStream, stream]);

  const isDisabled =
    permissionState !== 'granted' || !settings.shouldEnable[type];
  const isErrored = permissionState === 'denied' || !devices.length;
  const placeholder = isErrored ? 'No device available' : 'Loading devices...';

  return (
    <div className="flex flex-col gap-2">
      <SettingSwitch
        label={capitalize(type)}
        name={type}
        checked={settings.shouldEnable[type] && !isErrored}
        disabled={isErrored}
      />
      <Select
        aria-label={`${capitalize(type)} device`}
        name={`selector-${type}`}
        onChange={handleChangeDevice}
        options={devices.map(({ label, deviceId }) => ({
          label,
          value: deviceId,
        }))}
        value={selectedDevice?.deviceId ?? ''}
        error={
          isErrored
            ? `${capitalize(permissionName)} permission denied, we're not able to access to your device 🥺`
            : undefined
        }
        disabled={isDisabled}
        placeholder={selectedDevice ? undefined : placeholder}
      />
    </div>
  );
}
