import useSettings from '#/hooks/use_settings';
import useVideos from '#/hooks/devices/use_videos';
import DeviceSelector from '#/components/selectors/device_selector';

export default function VideosSelector() {
	const videos = useVideos();
	const {
		settings: { selected },
		changeSelectedDevice,
	} = useSettings();
	return (
		<DeviceSelector
			type="video"
			permissionName="camera"
			devices={videos}
			selectedDevice={selected.video!}
			onDeviceChange={(device) => changeSelectedDevice('video', device)}
		/>
	);
}
