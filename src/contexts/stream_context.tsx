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
  loading: boolean;
};

const StreamContext = createContext<StreamContextProps>({
  stream: null,
  startStream: () => {},
  stopStream: () => {},
  loading: false,
});

function StreamContextProvider({ children }: PropsWithChildren) {
  const {
    settings: { selected, shouldEnable },
  } = useSettings();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateMicrophoneConstraints = (device: MediaDeviceInfo) => ({
    deviceId: [device.deviceId],
  });
  const generateVideoConstraints = (device: MediaDeviceInfo) => ({
    deviceId: [device.deviceId],
    width: 1920,
    height: 1080,
  });

  const constraints = useMemo<MediaStreamConstraints>(() => {
    const audio: MediaStreamConstraints['audio'] =
      selected.microphone && shouldEnable.microphone
        ? generateMicrophoneConstraints(selected.microphone)
        : false;
    const video: MediaStreamConstraints['video'] =
      selected.video && shouldEnable.video
        ? generateVideoConstraints(selected.video)
        : false;

    return {
      audio,
      video,
    };
  }, [
    selected.video,
    selected.microphone,
    shouldEnable.video,
    shouldEnable.microphone,
  ]);

  const startStream = useCallback(async () => {
    if (stream) return;
    setLoading(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(stream);
    } finally {
      setLoading(false);
    }
  }, [constraints, stream]);

  const stopStream = useCallback(async () => {
    if (!stream) return;

    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setStream(null);
  }, [stream]);

  return (
    <StreamContext value={{ stream, startStream, stopStream, loading }}>
      {children}
    </StreamContext>
  );
}

export { StreamContextProvider, StreamContext as _StreamContext };
