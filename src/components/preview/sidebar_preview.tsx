import { Flex } from '@mantine/core';
import { useEffect } from 'react';
import VideoPreview from '~/components/preview/video_preview';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

type ToggleSettings = (name: string, value: boolean) => void;

export type SettingsTogglerProps = { toggleSettings: ToggleSettings };

export default function SidebarPreview() {
  const { stream, stopStream } = useStream();
  const {
    settings: { shouldEnable },
  } = useSettings();

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
    </Flex>
  );
}
