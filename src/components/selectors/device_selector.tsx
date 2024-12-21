import { Select, Switch } from '@mantine/core';
import { useEffect } from 'react';
import { Devices } from '~/contexts/devices_context';
import usePermissions from '~/hooks/permissions/use_permissions';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';
import useShouldCheckPermission from '~/hooks/use_should_check_permissions';
import { capitalize } from '~/lib/string';

interface DeviceSelectorProps {
  type: 'video' | 'microphone' | 'speaker';
  devices: Devices;
  permissionName: string;
  selectedDevice: MediaDeviceInfo;
  onDeviceChange: (device: MediaDeviceInfo) => void;
}

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
  const { settings, changeSettingsToggle } = useSettings();

  const handleChangeDevice = (deviceId: MediaDeviceInfo['deviceId']) =>
    onDeviceChange(devices.find((d) => d.deviceId === deviceId)!);

  useEffect(() => {
    if (stream && shouldCheckPermission && permissionState !== 'granted') {
      stopStream();
    }
  }, [permissionState, shouldCheckPermission, stopStream, stream]);

  const isDisabled =
    permissionState !== 'granted' || !settings.shouldEnable[type];
  const isErrored = permissionState === 'denied' || !devices.length;
  return (
    <Select
      label={
        <Switch
          label={capitalize(type)}
          checked={settings.shouldEnable[type] && !isErrored}
          onChange={(event) =>
            changeSettingsToggle(type, event.currentTarget.checked)
          }
          labelPosition="left"
          mb="xs"
          onLabel="ON"
          offLabel="OFF"
          disabled={isErrored}
        />
      }
      name={`selector-${type}`}
      onChange={(value) => handleChangeDevice(value!)}
      data={devices.map(({ label, deviceId }) => ({
        label,
        value: deviceId,
      }))}
      value={selectedDevice?.deviceId as never}
      error={
        isErrored &&
        `${capitalize(permissionName)} permission denied, we're not able to access
      to your device 🥺`
      }
      disabled={isDisabled}
      placeholder={isErrored ? 'No device available' : 'Loading devices...'}
    />
  );
}
