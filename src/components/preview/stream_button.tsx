import { Button } from '@minimalstuff/ui';

import useSettings from '#/hooks/use_settings';
import useStream from '#/hooks/stream/use_stream';
import MutedText from '#/components/common/muted_text';

export default function StreamButton() {
	const { stream, startStream, stopStream, loading } = useStream();
	const {
		settings: { shouldEnable },
	} = useSettings();
	const disabled = !shouldEnable.video && !shouldEnable.microphone;

	return (
		<div className="w-full">
			{stream ? (
				<Button fullWidth loading={loading} onClick={stopStream}>
					Stop testing
				</Button>
			) : (
				<Button
					fullWidth
					loading={loading}
					onClick={startStream}
					disabled={disabled || loading}
				>
					Test devices
				</Button>
			)}
			{disabled && (
				<MutedText className="mt-2 text-center">
					At least a video nor a microphone is required
				</MutedText>
			)}
		</div>
	);
}
