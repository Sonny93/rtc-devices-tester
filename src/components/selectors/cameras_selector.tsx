import DeviceSelector from '~/components/DeviceSelector';
import useCameras from '~/hooks/devices/use_cameras';
import useSettings from '~/hooks/use_settings';

export default function CamerasSelector() {
  const cameras = useCameras();
  const {
    settings: { selected },
    changeSelectedDevice,
  } = useSettings();

  console.log(selected.camera?.deviceId);
  return (
    <DeviceSelector
      type="camera"
      permissionName="camera"
      devices={cameras}
      selectedDevice={selected.camera!}
      onDeviceChange={(device) => changeSelectedDevice('camera', device)}
    />
  );
}
