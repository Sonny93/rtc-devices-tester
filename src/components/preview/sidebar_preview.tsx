import { useEffect } from 'react';

import useSettings from '#/hooks/use_settings';
import useStream from '#/hooks/stream/use_stream';
import VideoPreview from '#/components/preview/video_preview';

export default function SidebarPreview() {
	const { stream, stopStream } = useStream();
	const {
		settings: { shouldEnable },
	} = useSettings();

	const disabled = !shouldEnable.video && !shouldEnable.microphone;

	useEffect(() => {
		if (stream && disabled) {
			stopStream();
		}
	}, [disabled, stopStream, stream]);

	return (
		<div className="flex w-full flex-col items-start justify-center gap-2">
			<VideoPreview />
		</div>
	);
}
