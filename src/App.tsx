import { createRef, useEffect, useMemo, useState } from "react";

import MicrophoneSelector from "./components/MicrophoneSelector";

import "./App.css";

function App() {
  const videoRef = createRef<HTMLVideoElement>();
  const [flipVideo, setFlipVideo] = useState<boolean>(false);

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
    const audio: MediaStreamConstraints["audio"] = currentMicrophone
      ? {
          deviceId: [currentMicrophone.deviceId],
        }
      : false;
    const video: MediaStreamConstraints["video"] = currentCamera
      ? {
          deviceId: [currentCamera.deviceId],
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

    (videoTag as any).setSinkId(currentSpeaker?.deviceId).catch(console.error);
  }

  async function stopStream() {
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setStream(undefined);
  }

  useEffect(() => {
    // Stop and start track when current device change
    // const track = stream.getVideoTracks()[0];
    // track.stop();
    // stream.removeTrack(track);
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <MicrophoneSelector
        label="Microphone"
        deviceKind="audioinput"
        permissionName="microphone"
        currentValue={currentMicrophone}
        setValue={setCurrentMicrophone}
      />
      <MicrophoneSelector
        label="Speaker"
        deviceKind="audiooutput"
        permissionName="microphone"
        currentValue={currentSpeaker}
        setValue={setCurrentSpeaker}
      />
      <MicrophoneSelector
        label="Camera"
        deviceKind="videoinput"
        permissionName="camera"
        currentValue={currentCamera}
        setValue={setCurrentCamera}
      />
      <video
        style={flipVideo ? { transform: "scaleX(-1)" } : undefined}
        ref={videoRef}
        controls
      />
      {!stream ? (
        <button type="button" onClick={startStream}>
          Start stream
        </button>
      ) : (
        <button type="button" onClick={stopStream}>
          Stop stream
        </button>
      )}
      <div className="field">
        <input
          type="checkbox"
          name="input-flip-video"
          id="input-flip-video"
          checked={flipVideo}
          onChange={(event) => setFlipVideo(event.currentTarget.checked)}
        />
        <label htmlFor="input-flip-video">flip video</label>
      </div>
    </div>
  );
}

export default App;
