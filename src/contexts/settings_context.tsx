import { PropsWithChildren, createContext, useState } from 'react';
import store from 'store2';
import useVideos from '~/hooks/devices/use_videos';
import useMicrophones from '~/hooks/devices/use_microphones';
import useSpeakers from '~/hooks/devices/use_speakers';

const LS_SHOULD_ENABLE = 'should_enable_';

export type SettingsProps = {
  shouldEnable: {
    microphone: boolean;
    video: boolean;
    speaker: boolean;
  };
  selected: {
    microphone: MediaDeviceInfo | null;
    video: MediaDeviceInfo | null;
    speaker: MediaDeviceInfo | null;
  };
  flipVideo: boolean;
};

type ToggleSettingsCallback = (
  name: keyof SettingsProps['shouldEnable'] | 'flipVideo',
  value: boolean
) => void;

type ChangeSelectedCallback = (
  device: keyof SettingsProps['selected'],
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

  const [settings, setSettings] = useState<SettingsProps>(() => ({
    selected: {
      video: videos?.[0] ?? null,
      microphone: microphones?.[0] ?? null,
      speaker: speakers?.[0] ?? null,
    },
    shouldEnable: {
      video: store(LS_SHOULD_ENABLE + 'video'),
      microphone: store(LS_SHOULD_ENABLE + 'microphone'),
      speaker: store(LS_SHOULD_ENABLE + 'speaker'),
    },
    flipVideo: store(LS_SHOULD_ENABLE + 'flipVideo'),
  }));

  const changeSettingsToggle: ToggleSettingsCallback = (name, value) =>
    setSettings((_settings) => {
      const newSettings = { ..._settings };
      if (name === 'flipVideo') {
        newSettings['flipVideo'] = value;
      } else {
        newSettings['shouldEnable'][name] = value;
      }
      store(LS_SHOULD_ENABLE + name, value);
      return newSettings;
    });

  const changeSelectedDevice: ChangeSelectedCallback = (device, value) =>
    setSettings((_settings) => {
      const newSettings = { ..._settings };
      newSettings['selected'][device] = value;
      return newSettings;
    });

  return (
    <SettingsContext.Provider
      value={{ settings, changeSettingsToggle, changeSelectedDevice }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContextProvider, SettingsContext as _SettingsContext };
