import { Selector } from '@minimalstuff/ui';
import { useEffect } from 'react';
import DisplayPermissionStatus from '~/components/permissions/display_permission_status';
import { Devices } from '~/contexts/devices_context';
import usePermissions from '~/hooks/permissions/use_permissions';
import useStream from '~/hooks/stream/use_stream';
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

  const handleChangeDevice = (deviceId: MediaDeviceInfo['deviceId']) =>
    onDeviceChange(devices.find((d) => d.deviceId === deviceId)!);

  useEffect(() => {
    if (stream && shouldCheckPermission && permissionState !== 'granted') {
      stopStream();
    }
  }, [permissionState, shouldCheckPermission, stopStream, stream]);

  const showSelector = shouldCheckPermission
    ? permissionState === 'granted'
    : true;
  return (
    <div>
      {showSelector && (
        <Selector<MediaDeviceInfo['deviceId']>
          label={capitalize(type)}
          name={`selector-${type}`}
          onChangeCallback={handleChangeDevice}
          options={devices.map(({ label, deviceId }) => ({
            label,
            value: deviceId,
          }))}
          value={selectedDevice?.deviceId as never}
        />
      )}
      {permissionState && (
        <DisplayPermissionStatus
          state={permissionState}
          permissionName={permissionName}
        />
      )}
    </div>
  );
}
