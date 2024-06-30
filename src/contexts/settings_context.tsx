import { PropsWithChildren, createContext, useState } from 'react';
import store from 'store2';
import useVideos from '~/hooks/devices/use_videos';
import useMicrophones from '~/hooks/devices/use_microphones';
import useSpeakers from '~/hooks/devices/use_speakers';

const LS_SHOULD_ENABLE = 'should_enable_';

export type DeviceType = 'microphone' | 'video' | 'speaker';

export type SettingsProps = {
  shouldEnable: {
    [device in DeviceType]: boolean;
  };
  selected: {
    [device in DeviceType]: MediaDeviceInfo | null;
  };
  flipVideo: boolean;
};

type ToggleSettingsCallback = (
  name: DeviceType | 'flipVideo',
  value: boolean
) => void;

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
