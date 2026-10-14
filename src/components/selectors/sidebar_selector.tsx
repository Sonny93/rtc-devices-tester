import DividerLabel from '#/components/common/divider_label';
import MutedText from '#/components/common/muted_text';
import SettingSwitch from '#/components/common/setting_switch';
import StreamButton from '#/components/preview/stream_button';
import MicrophonesSelector from '#/components/selectors/microphones_selector';
import SpeakersSelector from '#/components/selectors/speakers_selector';
import VideosSelector from '#/components/selectors/videos_selector';
import useSettings from '#/hooks/use_settings';
import useShouldCheckPermission from '#/hooks/use_should_check_permissions';

export default function SidebarSelector() {
  const shouldCheckPermission = useShouldCheckPermission();
  const { settings } = useSettings();

  return (
    <div>
      <div className="flex flex-col gap-2">
        <DividerLabel label="Device selectors" />
        <VideosSelector />
        <MicrophonesSelector />
        <SpeakersSelector />

        <DividerLabel label="Render settings" />
        <SettingSwitch
          label="Flip video"
          name="flipVideo"
          checked={settings.flipVideo}
        />
        <SettingSwitch
          label="Show audio visualizer"
          name="visualizer"
          checked={settings.visualizer}
        />

        <DividerLabel label="Test devices" />
        <StreamButton />
      </div>
      {!shouldCheckPermission && (
        <MutedText className="mt-8 text-center">
          When using 🦊 Firefox, devices and permissions are broken.
          <br />
          If you are experiencing a issue, try a Chromium-based browser.
        </MutedText>
      )}
    </div>
  );
}
