/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import Legend from '~/components/common/legend';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

const Video = styled.video<{ flip?: boolean }>(({ theme, flip }) => ({
  width: '600px',
  borderRadius: '0.5em',
  boxShadow: theme.colors.boxShadow,
  objectFit: 'cover',
  transform: flip ? 'scaleX(-1)' : undefined,

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
    videoTag.volume = 0;
    videoTag.controls = true;
    videoTag.play();

    if (shouldEnable.speaker && selected.speaker) {
      videoTag.setSinkId(selected.speaker.deviceId);
      videoTag.volume = 0.3;
    }
  });

  return (
    <div css={{ width: '100%' }}>
      <Video
        onDoubleClick={() => videoRef.current?.requestFullscreen()}
        ref={videoRef}
        poster="/world.jpeg"
        flip={flipVideo}
        playsInline
      />
      <Legend css={{ textAlign: 'center' }}>
        {!stream ? 'Where are you?' : '👀'}
      </Legend>
    </div>
  );
}
