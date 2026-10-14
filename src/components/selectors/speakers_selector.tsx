import useSettings from '#/hooks/use_settings';
import useSpeakers from '#/hooks/devices/use_speakers';
import DeviceSelector from '#/components/selectors/device_selector';

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
