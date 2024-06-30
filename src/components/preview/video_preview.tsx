/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { ExternalLink } from '@minimalstuff/ui';
import { useEffect, useRef } from 'react';
import store from 'store2';
import Legend from '~/components/common/legend';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

const LS_USER_VOLUME = 'user_volume';
const DEFAULT_SPEAKER_VOLUME = 0.3;

const Video = styled.video<{ flip?: boolean }>(({ theme, flip }) => ({
  width: '600px',
  aspectRatio: '16 /9',
  borderRadius: '0.5em',
  boxShadow: theme.colors.boxShadow,
  objectFit: 'cover',
  transform: flip ? 'scaleX(-1)' : undefined,
  overflow: 'hidden',

  [`@media (max-width: ${theme.medias.mobile})`]: {
    width: '100%',
  },
}));

export default function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    settings: { flipVideo, shouldEnable, selected },
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
    <div css={{ width: '100%' }}>
      <Video
        onDoubleClick={() => videoRef.current?.requestFullscreen()}
        onVolumeChange={({ currentTarget }) =>
          store(LS_USER_VOLUME, Number(currentTarget.volume.toFixed(1)))
        }
        ref={videoRef}
        poster="/space.jpg"
        flip={flipVideo}
        playsInline
        muted={!shouldEnable.speaker}
      />
      <Legend center>
        {!stream ? (
          <>
            Photo by{' '}
            <ExternalLink href="https://unsplash.com/fr/@aldebarans?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Aldebaran S
            </ExternalLink>{' '}
            on{' '}
            <ExternalLink href="https://unsplash.com/fr/photos/illustration-de-galaxie-violette-et-noire-uXchDIKs4qI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Unsplash
            </ExternalLink>
          </>
        ) : (
          '👀'
        )}
      </Legend>
    </div>
  );
}
