/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { Button, Checkbox, useThemeSwitcher } from '@minimalstuff/ui';
import { useEffect } from 'react';
import Legend from '~/components/common/legend';
import Separator from '~/components/common/separator';
import VideoPreview from '~/components/preview/video_preview';
import { SettingsProps } from '~/contexts/settings_context';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

const SidebarPreviewWrapper = styled.section({
  height: '100%',
  width: '100%',
  display: 'flex',
  flex: 1,
  justifycontent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export default function SidebarPreview() {
  const { stream, startStream, stopStream } = useStream();
  const {
    settings: { shouldEnable, flipVideo },
    changeSettingsToggle,
  } = useSettings();
  const { isDarkTheme, toggleDarkTheme } = useThemeSwitcher();

  const toggleSettings = (name: string, value: boolean) =>
    changeSettingsToggle(name as keyof SettingsProps['shouldEnable'], value);

  const disabled = !shouldEnable.video && !shouldEnable.microphone;

  useEffect(() => {
    if (stream && disabled) {
      stopStream();
    }
  }, [disabled, stopStream, stream]);

  return (
    <SidebarPreviewWrapper>
      <VideoPreview />
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
      <Checkbox
        label="Enable video"
        name="video"
        onChange={toggleSettings}
        checked={shouldEnable.video}
        inline
        reverse
      />
      <Checkbox
        label="Enable microphone"
        name="microphone"
        onChange={toggleSettings}
        checked={shouldEnable.microphone}
        inline
        reverse
      />
      <Checkbox
        label="Enable speaker"
        name="speaker"
        onChange={toggleSettings}
        checked={shouldEnable.speaker}
        inline
        reverse
      />
      <Checkbox
        label="Flip video"
        name="flip-video"
        onChange={(_, checked) => changeSettingsToggle('flipVideo', checked)}
        checked={flipVideo}
        inline
        reverse
        style={{ gap: '1em' }}
      />
      <Separator />
      <Checkbox
        label="Dark theme"
        name="theme-switcher"
        onChange={(_, checked) => toggleDarkTheme(checked)}
        checked={isDarkTheme}
        inline
        reverse
      />
    </SidebarPreviewWrapper>
  );
}
