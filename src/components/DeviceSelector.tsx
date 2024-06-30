/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { Selector } from '@minimalstuff/ui';
import { useCallback, useEffect, useState } from 'react';
import Legend from '~/components/common/legend';
import { Devices } from '~/contexts/devices_context';
import useShouldCheckPermission from '~/hooks/use_should_check_permissions';
import { capitalize } from '~/lib/string';
import { getPermissions } from '../lib/permission';

const Emoji = styled.span({
  fontSize: '20px',
});

const PermissionGranted = styled(Legend)(({ theme }) => ({
  color: theme.colors.green.default,
}));

const PermissionDenied = styled(Legend)(({ theme }) => ({
  color: theme.colors.red.default,
}));

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
  const [permissionState, setPermissionState] = useState<
    PermissionStatus['state'] | undefined
  >(undefined);
  const shouldCheckPermission = useShouldCheckPermission();

  const init = useCallback(async () => {
    const query = await getPermissions(permissionName!.toLowerCase());

    const isAudioDevice = permissionName!.toLowerCase() === 'microphone';

    setPermissionState(query.state);
    checkAudioPermission(query.state, isAudioDevice);

    query.addEventListener('change', ({ currentTarget }) => {
      const state = (currentTarget as any).state; // TODO: Fix any type

      setPermissionState(state);
      checkAudioPermission(state, isAudioDevice);
    });
  }, [permissionName]);

  const handleChangeDevice = (deviceId: MediaDeviceInfo['deviceId']) =>
    onDeviceChange(devices.find((d) => d.deviceId === deviceId)!);

  useEffect(() => {
    if (shouldCheckPermission) {
      init();
    }
  }, [init, shouldCheckPermission]);

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
          css={{ width: '100%' }}
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

function DisplayPermissionStatus({
  state,
  permissionName,
}: {
  state: PermissionStatus['state'];
  permissionName: DeviceSelectorProps['permissionName'];
}) {
  return state === 'prompt' ? (
    <Legend>
      <Emoji>🤔</Emoji>
      Waiting for {permissionName} permission
    </Legend>
  ) : state === 'granted' ? (
    <PermissionGranted>
      <Emoji>😊</Emoji>
      Permission granted for {permissionName}!
    </PermissionGranted>
  ) : (
    <PermissionDenied>
      <Emoji>🥺</Emoji>
      Permission denied for {permissionName}, we're not able to access to your
      device...
    </PermissionDenied>
  );
}

async function testRequestDevice(isAudioDevice: boolean = true) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: isAudioDevice,
    video: !isAudioDevice,
  });
  stream.getTracks().map((track) => track.stop());
}

async function checkAudioPermission(
  state: PermissionStatus['state'],
  isAudioDevice: boolean
) {
  if (state === 'prompt') {
    testRequestDevice(isAudioDevice);
  }
}
