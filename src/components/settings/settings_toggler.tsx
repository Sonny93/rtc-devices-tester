import { Checkbox } from '@mantine/core';
import { SettingsTogglerProps } from '~/components/preview/sidebar_preview';
import { DeviceType } from '~/contexts/settings_context';
import usePermissions from '~/hooks/permissions/use_permissions';
import useSettings from '~/hooks/use_settings';
import useShouldCheckPermission from '~/hooks/use_should_check_permissions';

export default function SettingsToggler({
  toggleSettings,
  type,
}: SettingsTogglerProps & { type: DeviceType }) {
  const {
    settings: { shouldEnable },
  } = useSettings();
  const permissionState = usePermissions(type);
  const shouldCheckPermission = useShouldCheckPermission();
  return (
    <Checkbox
      label={`Enable ${type}`}
      name={type}
      onChange={(event) => toggleSettings(type, event.currentTarget.checked)}
      checked={shouldEnable[type]}
      disabled={permissionState !== 'granted' && shouldCheckPermission}
    />
  );
}
