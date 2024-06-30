import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import useSettings from '~/hooks/use_settings';

type StreamContextProps = {
  stream: MediaStream | null;
  startStream: () => void;
  stopStream: () => void;
};

const StreamContext = createContext<StreamContextProps>({
  stream: null,
  startStream: () => {},
  stopStream: () => {},
});

function StreamContextProvider({ children }: PropsWithChildren) {
  const {
    settings: { selected },
  } = useSettings();
  const [stream, setStream] = useState<MediaStream | null>(null);

  const generateMicrophoneConstraints = (device: MediaDeviceInfo) => ({
    deviceId: [device.deviceId],
  });
  const generateVideoConstraints = (device: MediaDeviceInfo) => ({
    deviceId: [device.deviceId],
    width: 1920,
    height: 1080,
  });

  const constraints = useMemo<MediaStreamConstraints>(() => {
    const audio: MediaStreamConstraints['audio'] = selected.microphone
      ? generateMicrophoneConstraints(selected.microphone)
      : false;
    const video: MediaStreamConstraints['video'] = selected.camera
      ? generateVideoConstraints(selected.camera)
      : false;

    return {
      audio,
      video,
    };
  }, [selected.camera, selected.microphone]);

  const startStream = useCallback(async () => {
    if (stream) return;

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    setStream(newStream);
  }, [constraints, stream]);

  const stopStream = useCallback(async () => {
    if (!stream) return;

    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setStream(null);
  }, [stream]);

  return (
    <StreamContext.Provider value={{ stream, startStream, stopStream }}>
      {children}
    </StreamContext.Provider>
  );
}

export { StreamContextProvider, StreamContext as _StreamContext };
