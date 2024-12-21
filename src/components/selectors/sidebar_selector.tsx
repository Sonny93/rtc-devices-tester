import { Box, Divider, Stack, Text } from '@mantine/core';
import { Switch } from '~/components/common/switch';
import StreamButton from '~/components/preview/stream_button';
import MicrophonesSelector from '~/components/selectors/microphones_selector';
import SpeakersSelector from '~/components/selectors/speakers_selector';
import VideosSelector from '~/components/selectors/videos_selector';
import { AvailableSettings } from '~/contexts/settings_context';
import useSettings from '~/hooks/use_settings';
import useShouldCheckPermission from '~/hooks/use_should_check_permissions';

export default function SidebarSelector() {
  const shouldCheckPermission = useShouldCheckPermission();
  const { settings, changeSettingsToggle } = useSettings();

  return (
    <Box>
      <Stack gap="xs">
        <Divider label="Device selectors" w="100%" />
        <VideosSelector />
        <MicrophonesSelector />
        <SpeakersSelector />

        <Divider label="Render settings" w="100%" />
        <Switch
          label="Flip video"
          name="flipVideo"
          checked={settings.flipVideo}
          onChange={(name, checked) =>
            changeSettingsToggle(name as AvailableSettings, checked)
          }
        />
        <Switch
          label="Show audio visualizer"
          name="visualizer"
          checked={settings.visualizer}
          onChange={(name, checked) =>
            changeSettingsToggle(name as AvailableSettings, checked)
          }
        />

        <Divider label="Test devices" w="100%" />
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
