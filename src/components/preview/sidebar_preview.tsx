import styled from '@emotion/styled';
import { Checkbox, useThemeSwitcher } from '@minimalstuff/ui';
import { useEffect } from 'react';
import Separator from '~/components/common/separator';
import StreamButton from '~/components/preview/stream_button';
import VideoPreview from '~/components/preview/video_preview';
import SettingsToggler from '~/components/settings/settings_toggler';
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

type ToggleSettings = (name: string, value: boolean) => void;

export type SettingsTogglerProps = { toggleSettings: ToggleSettings };

export default function SidebarPreview() {
  const { stream, stopStream } = useStream();
  const {
    settings: { shouldEnable, flipVideo },
    changeSettingsToggle,
  } = useSettings();
  const { isDarkTheme, toggleDarkTheme } = useThemeSwitcher();

  const toggleSettings: ToggleSettings = (name, value) =>
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
      <StreamButton />
      <SettingsToggler toggleSettings={toggleSettings} type="video" />
      <SettingsToggler toggleSettings={toggleSettings} type="microphone" />
      <SettingsToggler toggleSettings={toggleSettings} type="speaker" />
      <Checkbox
        label="Flip video"
        name="flip-video"
        onChange={(_, checked) => changeSettingsToggle('flipVideo', checked)}
        checked={flipVideo}
        inline
        reverse
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
