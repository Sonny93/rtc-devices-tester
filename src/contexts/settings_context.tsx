import { PropsWithChildren, createContext, useState } from 'react';
import store from 'store2';
import useCameras from '~/hooks/devices/use_cameras';
import useMicrophones from '~/hooks/devices/use_microphones';
import useSpeakers from '~/hooks/devices/use_speakers';

const LS_SHOULD_ENABLE = 'should_enable_';

export type SettingsProps = {
  shouldEnable: {
    microphone: boolean;
    camera: boolean;
    speaker: boolean;
  };
  selected: {
    microphone: MediaDeviceInfo | null;
    camera: MediaDeviceInfo | null;
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
    camera: true,
    speaker: false,
  },
  selected: {
    microphone: null,
    camera: null,
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
  const cameras = useCameras();
  const micros = useMicrophones();
  const speakers = useSpeakers();

  const [settings, setSettings] = useState<SettingsProps>(() => ({
    selected: {
      camera: cameras?.[0] ?? null,
      microphone: micros?.[0] ?? null,
      speaker: speakers?.[0] ?? null,
    },
    shouldEnable: {
      camera: store(LS_SHOULD_ENABLE + 'video'),
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
