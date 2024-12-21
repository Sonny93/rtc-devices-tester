import { Anchor, Text } from '@mantine/core';
import { useEffect, useRef } from 'react';
import store from 'store2';
import ExternalLink from '~/components/common/external_link';
import { Visualizer } from '~/components/preview/visualizer';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

const LS_USER_VOLUME = 'user_volume';
const DEFAULT_SPEAKER_VOLUME = 0.3;

export default function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    settings: { shouldEnable, selected },
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
    videoTag.play();

    if (shouldEnable.speaker && selected.speaker) {
      videoTag.setSinkId(selected.speaker.deviceId);
    }
  });

  return (
    <div style={{ width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <Visualizer />
        <video
          style={{
            height: '334px',
            width: 'auto',
            aspectRatio: '16 /9',
            borderRadius: '0.5em',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover',
            overflow: 'hidden',
          }}
          onDoubleClick={() => videoRef.current?.requestFullscreen()}
          onVolumeChange={({ currentTarget }) =>
            store(LS_USER_VOLUME, Number(currentTarget.volume.toFixed(1)))
          }
          ref={videoRef}
          poster="/space.jpg"
          playsInline
          muted={!shouldEnable.speaker}
        />
      </div>
      <Text c="dimmed" style={{ textAlign: 'center' }}>
        {!stream ? (
          <>
            Photo by{' '}
            <Anchor
              component={ExternalLink}
              href="https://unsplash.com/fr/@aldebarans?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            >
              Aldebaran S
            </Anchor>{' '}
            on{' '}
            <Anchor
              component={ExternalLink}
              href="https://unsplash.com/fr/photos/illustration-de-galaxie-violette-et-noire-uXchDIKs4qI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            >
              Unsplash
            </Anchor>
          </>
        ) : (
          '👀'
        )}
      </Text>
    </div>
  );
}
