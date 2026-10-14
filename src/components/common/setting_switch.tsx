import { Switch } from '@minimalstuff/ui';
import type { ChangeEvent } from 'react';
import type { AvailableSettings } from '#/contexts/settings_context';
import useSettings from '#/hooks/use_settings';

type SettingSwitchProps = Readonly<{
	label: string;
	name: AvailableSettings;
	checked: boolean;
	disabled?: boolean;
}>;

export default function SettingSwitch({
	label,
	name,
	checked,
	disabled,
}: SettingSwitchProps) {
	const { changeSettingsToggle } = useSettings();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
		changeSettingsToggle(name, event.target.checked);

	return (
		<Switch
			label={label}
			name={name}
			checked={checked}
			disabled={disabled}
			onChange={handleChange}
		/>
	);
}
