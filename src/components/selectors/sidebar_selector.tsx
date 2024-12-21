import { Stack, Text } from '@mantine/core';
import MicrophonesSelector from '~/components/selectors/microphones_selector';
import SpeakersSelector from '~/components/selectors/speakers_selector';
import VideosSelector from '~/components/selectors/videos_selector';
import useShouldCheckPermission from '~/hooks/use_should_check_permissions';

export default function SidebarSelector() {
  const shouldCheckPermission = useShouldCheckPermission();
  return (
    <div>
      <Stack gap="xl" p="md">
        <VideosSelector />
        <MicrophonesSelector />
        <SpeakersSelector />
      </Stack>
      {!shouldCheckPermission && (
        <Text c="dimmed" style={{ marginTop: '2em', textAlign: 'center' }}>
          When using 🦊 Firefox, devices and permissions are broken.
          <br />
          If you are experiencing a issue, try a Chromium-based browser.
        </Text>
      )}
    </div>
  );
}
