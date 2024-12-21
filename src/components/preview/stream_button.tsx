import { Button, Text } from '@mantine/core';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

export default function StreamButton() {
  const { stream, startStream, stopStream } = useStream();
  const {
    settings: { shouldEnable },
  } = useSettings();
  const disabled = !shouldEnable.video && !shouldEnable.microphone;

  return (
    <div style={{ width: '100%' }}>
      {!stream ? (
        <Button type="button" onClick={startStream} disabled={disabled}>
          Test devices
        </Button>
      ) : (
        <Button type="button" onClick={stopStream}>
          Stop testing
        </Button>
      )}
      {disabled && (
        <Text c="dimmed" style={{ textAlign: 'center' }}>
          At least a video nor a microphone is required
        </Text>
      )}
    </div>
  );
}
