import DeviceSelector from '~/components/DeviceSelector';
import useSpeakers from '~/hooks/devices/use_speakers';
import useSettings from '~/hooks/use_settings';

export default function SpeakersSelector() {
  const speakers = useSpeakers();
  const {
    settings: { selected },
    changeSelectedDevice,
  } = useSettings();
  return (
    <DeviceSelector
      type="speaker"
      permissionName="microphone"
      devices={speakers}
      selectedDevice={selected.speaker!}
      onDeviceChange={(device) => changeSelectedDevice('speaker', device)}
    />
  );
}
