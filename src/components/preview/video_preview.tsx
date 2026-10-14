import clsx from 'clsx';
import store from 'store2';
import { type SyntheticEvent, useEffect, useRef } from 'react';

import useSettings from '#/hooks/use_settings';
import useStream from '#/hooks/stream/use_stream';
import MutedText from '#/components/common/muted_text';
import PhotoCredit from '#/components/preview/photo_credit';
import { Visualizer } from '#/components/preview/visualizer';

const LS_USER_VOLUME = 'user_volume';
const DEFAULT_SPEAKER_VOLUME = 0.3;

export default function VideoPreview() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const {
		settings: { shouldEnable, selected, flipVideo },
	} = useSettings();
	const { stream } = useStream();

	useEffect(() => {
		const videoTag = videoRef.current;
		if (!stream || !videoTag) {
			if (videoTag) videoTag.controls = false;

			videoTag?.load();
			return;
		}

		videoTag.srcObject = stream;
		videoTag.volume = store(LS_USER_VOLUME) ?? DEFAULT_SPEAKER_VOLUME;
		videoTag.controls = true;
		videoTag.play().catch(console.error);

		if (shouldEnable.speaker && selected.speaker) {
			videoTag.setSinkId(selected.speaker.deviceId).catch(console.error);
		}
	});

	const handleDoubleClick = () => {
		videoRef.current?.requestFullscreen().catch(console.error);
	};

	const handleVolumeChange = ({
		currentTarget,
	}: SyntheticEvent<HTMLVideoElement>) =>
		store(LS_USER_VOLUME, Number(currentTarget.volume.toFixed(1)));

	return (
		<div className="w-full">
			<div className="relative">
				<Visualizer />
				<video
					className={clsx(
						'aspect-video h-auto w-full overflow-hidden rounded-lg object-cover shadow-md',
						flipVideo && '-scale-x-100'
					)}
					onDoubleClick={handleDoubleClick}
					onVolumeChange={handleVolumeChange}
					ref={videoRef}
					poster={`${import.meta.env.BASE_URL}space.jpg`}
					playsInline
					muted={!shouldEnable.speaker}
				/>
			</div>
			{stream ? (
				<MutedText className="text-center">👀</MutedText>
			) : (
				<PhotoCredit />
			)}
		</div>
	);
}
