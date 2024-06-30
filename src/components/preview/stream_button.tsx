/** @jsxImportSource @emotion/react */

import { Button } from '@minimalstuff/ui';
import Legend from '~/components/common/legend';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

export default function StreamButton() {
  const { stream, startStream, stopStream } = useStream();
  const {
    settings: { shouldEnable },
  } = useSettings();
  const disabled = !shouldEnable.video && !shouldEnable.microphone;

  return (
    <div css={{ width: '100%' }}>
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
        <Legend center>At least a video nor a microphone is required</Legend>
      )}
    </div>
  );
}
