import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { writeStoredToggle } from '#/lib/settings_storage';
import StreamButton from '#/components/preview/stream_button';
import { StreamContextProvider } from '#/contexts/stream_context';
import { SettingsContextProvider } from '#/contexts/settings_context';

const HELPER_TEXT = 'At least a video nor a microphone is required';

const renderStreamButton = () =>
	render(
		<SettingsContextProvider>
			<StreamContextProvider>
				<StreamButton />
			</StreamContextProvider>
		</SettingsContextProvider>
	);

const disableVideoAndMicrophone = () => {
	writeStoredToggle('video', false);
	writeStoredToggle('microphone', false);
};

describe('StreamButton', () => {
	it('should disable the start button when video and microphone are disabled', () => {
		disableVideoAndMicrophone();

		renderStreamButton();

		const startButton = screen.getByRole<HTMLButtonElement>('button', {
			name: 'Test devices',
		});
		expect(startButton.disabled).toBe(true);
	});

	it('should show the helper text when video and microphone are disabled', () => {
		disableVideoAndMicrophone();

		renderStreamButton();

		expect(screen.queryByText(HELPER_TEXT)).not.toBeNull();
	});

	it('should enable the start button when video and microphone are enabled by default', () => {
		renderStreamButton();

		const startButton = screen.getByRole<HTMLButtonElement>('button', {
			name: 'Test devices',
		});
		expect(startButton.disabled).toBe(false);
	});

	it('should hide the helper text when video is enabled', () => {
		writeStoredToggle('microphone', false);

		renderStreamButton();

		expect(screen.queryByText(HELPER_TEXT)).toBeNull();
	});
});
