import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import useSettings from '#/hooks/use_settings';
import { readStoredToggle } from '#/lib/settings_storage';
import SettingSwitch from '#/components/common/setting_switch';
import { SettingsContextProvider } from '#/contexts/settings_context';

const FlipVideoSwitch = () => {
	const { settings } = useSettings();
	return (
		<SettingSwitch
			label="Flip video"
			name="flipVideo"
			checked={settings.flipVideo}
		/>
	);
};

const renderFlipVideoSwitch = () =>
	render(
		<SettingsContextProvider>
			<FlipVideoSwitch />
		</SettingsContextProvider>
	);

const getFlipVideoSwitch = () =>
	screen.getByRole<HTMLInputElement>('switch', { name: 'Flip video' });

describe('SettingSwitch', () => {
	it('should be unchecked when the setting is off by default', () => {
		renderFlipVideoSwitch();

		expect(getFlipVideoSwitch().checked).toBe(false);
	});

	it('should become checked when clicked', () => {
		renderFlipVideoSwitch();

		fireEvent.click(getFlipVideoSwitch());

		expect(getFlipVideoSwitch().checked).toBe(true);
	});

	it('should persist the setting in localStorage when clicked', () => {
		renderFlipVideoSwitch();

		fireEvent.click(getFlipVideoSwitch());

		expect(readStoredToggle('flipVideo', false)).toBe(true);
	});
});
