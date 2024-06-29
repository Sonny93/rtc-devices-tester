import { createRef, useEffect, useMemo, useState } from 'react';

import DeviceSelector from './components/DeviceSelector';
import SettingToggler from './components/SettingToggler';

import './App.css';

function App() {
  const videoRef = createRef<HTMLVideoElement>();

  const [flipVideo, setFlipVideo] = useState<boolean>(false);
  const [enableVideo, setEnableVideo] = useState<boolean>(true);
  const [enableMicrophone, setEnableMicrophone] = useState<boolean>(true);
  const [enableSpeaker, setEnableSpeaker] = useState<boolean>(false);

  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  const [currentMicrophone, setCurrentMicrophone] = useState<
    MediaDeviceInfo | undefined
  >(undefined);
  const [currentSpeaker, setCurrentSpeaker] = useState<
    MediaDeviceInfo | undefined
  >(undefined);
  const [currentCamera, setCurrentCamera] = useState<
    MediaDeviceInfo | undefined
  >(undefined);

  const constraints = useMemo<MediaStreamConstraints>(() => {
    const audio: MediaStreamConstraints['audio'] = currentMicrophone
      ? {
          deviceId: [currentMicrophone.deviceId],
        }
      : false;
    const video: MediaStreamConstraints['video'] = currentCamera
      ? {
          deviceId: [currentCamera.deviceId],
          width: 1920,
          height: 1080,
        }
      : false;

    console.log(audio, currentMicrophone, video, currentCamera);
    return {
      audio,
      video,
    };
  }, [currentCamera, currentMicrophone]);

  async function startStream() {
    if (stream || !videoRef.current) return;

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    setStream(newStream);

    const videoTag = videoRef.current;
    videoTag.srcObject = newStream;
    videoTag.play();

    if (enableSpeaker) {
      (videoTag as any)
        .setSinkId(currentSpeaker?.deviceId)
        .catch(console.error);
      videoTag.volume = 0.3;
    } else {
      videoTag.volume = 0;
    }
  }

  async function stopStream() {
    if (!stream) return;

    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setStream(undefined);

    videoRef.current?.load();
  }

  useEffect(() => {
    // Stop and start track when current device change
    // const track = stream.getVideoTracks()[0];
    // track.stop();
    // stream.removeTrack(track);
  }, []);

  return (
    <div className="App">
      <h1>RTC Devices Tester</h1>
      <main>
        <section className="device-selectors">
          <DeviceSelector
            label="Microphone"
            deviceKind="audioinput"
            permissionName="microphone"
            currentValue={currentMicrophone}
            setValue={setCurrentMicrophone}
          />
          <DeviceSelector
            label="Speaker"
            deviceKind="audiooutput"
            permissionName="microphone"
            currentValue={currentSpeaker}
            setValue={setCurrentSpeaker}
          />
          <DeviceSelector
            label="Camera"
            deviceKind="videoinput"
            permissionName="camera"
            currentValue={currentCamera}
            setValue={setCurrentCamera}
          />
        </section>
        <section className="video-wrapper">
          <div className="field">
            <video
              style={flipVideo ? { transform: 'scaleX(-1)' } : undefined}
              onDoubleClick={() => videoRef.current?.requestFullscreen()}
              ref={videoRef}
              playsInline
              poster="/world.jpeg"
              // controls
            />
            <p className="legend" style={{ textAlign: 'center' }}>
              {!stream ? 'Where are you?' : '👀'}
            </p>
          </div>
          {!stream ? (
            <button type="button" onClick={startStream}>
              Test devices
            </button>
          ) : (
            <button type="button" onClick={stopStream}>
              Stop testing
            </button>
          )}
          <SettingToggler
            label="Flip Video"
            name="flip-video"
            value={flipVideo}
            setValue={setFlipVideo}
          />
          <SettingToggler
            label="Enable Video"
            name="enable-video"
            value={enableVideo}
            setValue={setEnableVideo}
          />
          <SettingToggler
            label="Enable Microphone"
            name="enable-microphone"
            value={enableMicrophone}
            setValue={setEnableMicrophone}
          />
          <SettingToggler
            label="Enable Speaker"
            name="enable-speaker"
            value={enableSpeaker}
            setValue={setEnableSpeaker}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
