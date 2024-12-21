import { Checkbox, Divider, Flex, useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';
import StreamButton from '~/components/preview/stream_button';
import VideoPreview from '~/components/preview/video_preview';
import SettingsToggler from '~/components/settings/settings_toggler';
import { SettingsProps } from '~/contexts/settings_context';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

type ToggleSettings = (name: string, value: boolean) => void;

export type SettingsTogglerProps = { toggleSettings: ToggleSettings };

export default function SidebarPreview() {
  const { stream, stopStream } = useStream();
  const {
    settings: { shouldEnable, flipVideo },
    changeSettingsToggle,
  } = useSettings();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const toggleSettings: ToggleSettings = (name, value) =>
    changeSettingsToggle(name as keyof SettingsProps['shouldEnable'], value);

  const disabled = !shouldEnable.video && !shouldEnable.microphone;

  useEffect(() => {
    if (stream && disabled) {
      stopStream();
    }
  }, [disabled, stopStream, stream]);

  return (
    <Flex
      h="100%"
      w="100%"
      flex={1}
      gap="xs"
      justify="center"
      align="flex-start"
      direction="column"
    >
      <VideoPreview />
      <StreamButton />
      <SettingsToggler toggleSettings={toggleSettings} type="video" />
      <SettingsToggler toggleSettings={toggleSettings} type="microphone" />
      <SettingsToggler toggleSettings={toggleSettings} type="speaker" />
      <Checkbox
        label="Flip video"
        name="flip-video"
        onChange={(event) =>
          changeSettingsToggle('flipVideo', event.target.checked)
        }
        checked={flipVideo}
      />
      <Divider w="100%" />
      <Checkbox
        label="Dark theme"
        name="theme-switcher"
        onChange={toggleColorScheme}
        checked={colorScheme === 'dark'}
      />
    </Flex>
  );
}
