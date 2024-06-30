import DeviceSelector from '~/components/DeviceSelector';
import useMicrophones from '~/hooks/devices/use_microphones';
import useSettings from '~/hooks/use_settings';

export default function MicrophonesSelector() {
  const microphones = useMicrophones();
  const {
    settings: { selected },
    changeSelectedDevice,
  } = useSettings();
  return (
    <DeviceSelector
      type="microphone"
      permissionName="microphone"
      devices={microphones}
      selectedDevice={selected.microphone!}
      onDeviceChange={(device) => changeSelectedDevice('microphone', device)}
    />
  );
}
