import { Button, Text } from '@mantine/core';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

export default function StreamButton() {
  const { stream, startStream, stopStream, loading } = useStream();
  const {
    settings: { shouldEnable },
  } = useSettings();
  const disabled = !shouldEnable.video && !shouldEnable.microphone;

  const commonProps = {
    type: 'button',
    w: '100%',
    loading,
  } as const;
  return (
    <div style={{ width: '100%' }}>
      {!stream ? (
        <Button {...commonProps} onClick={startStream} disabled={disabled}>
          Test devices
        </Button>
      ) : (
        <Button {...commonProps} onClick={stopStream}>
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
