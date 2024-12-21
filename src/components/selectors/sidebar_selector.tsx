import { Box, Stack, Switch, Text } from '@mantine/core';
import StreamButton from '~/components/preview/stream_button';
import MicrophonesSelector from '~/components/selectors/microphones_selector';
import SpeakersSelector from '~/components/selectors/speakers_selector';
import VideosSelector from '~/components/selectors/videos_selector';
import useSettings from '~/hooks/use_settings';
import useShouldCheckPermission from '~/hooks/use_should_check_permissions';

export default function SidebarSelector() {
  const shouldCheckPermission = useShouldCheckPermission();
  const {
    settings: { flipVideo },
    changeSettingsToggle,
  } = useSettings();

  return (
    <Box>
      <Stack gap="xs">
        <VideosSelector />
        <MicrophonesSelector />
        <SpeakersSelector />
        <Switch
          label={<Text fw={500}>Flip video</Text>}
          name="flip-video"
          onChange={(event) =>
            changeSettingsToggle('flipVideo', event.target.checked)
          }
          labelPosition="left"
          size="md"
          onLabel="ON"
          offLabel="OFF"
          checked={flipVideo}
        />
        <StreamButton />
      </Stack>
      {!shouldCheckPermission && (
        <Text c="dimmed" style={{ marginTop: '2em', textAlign: 'center' }}>
          When using 🦊 Firefox, devices and permissions are broken.
          <br />
          If you are experiencing a issue, try a Chromium-based browser.
        </Text>
      )}
    </Box>
  );
}
