import { PropsWithChildren, createContext, useState } from 'react';

import useVideos from '#/hooks/devices/use_videos';
import useSpeakers from '#/hooks/devices/use_speakers';
import useMicrophones from '#/hooks/devices/use_microphones';
import { readStoredToggle, writeStoredToggle } from '#/lib/settings_storage';

type DeviceType = 'microphone' | 'video' | 'speaker';

type SettingsProps = {
	shouldEnable: {
		[device in DeviceType]: boolean;
	};
	selected: {
		[device in DeviceType]: MediaDeviceInfo | null;
	};
	flipVideo: boolean;
	visualizer: boolean;
};

export type AvailableSettings = DeviceType | 'flipVideo' | 'visualizer';

type ToggleSettingsCallback = (name: AvailableSettings, value: boolean) => void;

type ChangeSelectedCallback = (
	device: DeviceType,
	value: MediaDeviceInfo
) => void;

const SettingsContextDefaultValue: SettingsProps = {
	shouldEnable: {
		microphone: true,
		video: true,
		speaker: false,
	},
	selected: {
		microphone: null,
		video: null,
		speaker: null,
	},
	flipVideo: false,
	visualizer: false,
};

const applyToggle = (
	settings: SettingsProps,
	name: AvailableSettings,
	value: boolean
): SettingsProps => {
	if (name === 'flipVideo' || name === 'visualizer') {
		return { ...settings, [name]: value };
	}
	return {
		...settings,
		shouldEnable: { ...settings.shouldEnable, [name]: value },
	};
};

const SettingsContext = createContext<{
	settings: SettingsProps;
	changeSettingsToggle: ToggleSettingsCallback;
	changeSelectedDevice: ChangeSelectedCallback;
}>({
	settings: SettingsContextDefaultValue,
	changeSettingsToggle: () => {},
	changeSelectedDevice: () => {},
});

function SettingsContextProvider({ children }: PropsWithChildren) {
	const videos = useVideos();
	const microphones = useMicrophones();
	const speakers = useSpeakers();

	const defaults = SettingsContextDefaultValue;
	const [settings, setSettings] = useState<SettingsProps>(() => ({
		selected: {
			video: videos?.[0] ?? null,
			microphone: microphones?.[0] ?? null,
			speaker: speakers?.[0] ?? null,
		},
		shouldEnable: {
			video: readStoredToggle('video', defaults.shouldEnable.video),
			microphone: readStoredToggle(
				'microphone',
				defaults.shouldEnable.microphone
			),
			speaker: readStoredToggle('speaker', defaults.shouldEnable.speaker),
		},
		flipVideo: readStoredToggle('flipVideo', defaults.flipVideo),
		visualizer: readStoredToggle('visualizer', defaults.visualizer),
	}));

	const changeSettingsToggle: ToggleSettingsCallback = (name, value) => {
		setSettings((previousSettings) =>
			applyToggle(previousSettings, name, value)
		);
		writeStoredToggle(name, value);
	};

	const changeSelectedDevice: ChangeSelectedCallback = (device, value) =>
		setSettings((previousSettings) => ({
			...previousSettings,
			selected: { ...previousSettings.selected, [device]: value },
		}));

	return (
		<SettingsContext
			value={{ settings, changeSettingsToggle, changeSelectedDevice }}
		>
			{children}
		</SettingsContext>
	);
}

export { SettingsContextProvider, SettingsContext as _SettingsContext };
