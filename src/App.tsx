import { createRef, useEffect, useMemo, useState } from "react";

import DeviceSelector from "./components/DeviceSelector";

import "./App.css";

function App() {
  const videoRef = createRef<HTMLVideoElement>();
  const videoBackgroundRef = createRef<HTMLVideoElement>();
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
    if (stream || !videoRef.current || !videoBackgroundRef.current) return;

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    setStream(newStream);

    const videoBackgroundTag = videoBackgroundRef.current;
    videoBackgroundTag.srcObject = newStream;
    videoBackgroundTag.play();

    const videoTag = videoRef.current;
    videoTag.srcObject = newStream;
    videoTag.play();

    (videoTag as any).setSinkId(currentSpeaker?.deviceId).catch(console.error);
  }

  async function stopStream() {
    const tracks = stream?.getTracks();
    console.log("tracks", tracks);
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
          <video
            style={flipVideo ? { transform: "scaleX(-1)" } : undefined}
            ref={videoRef}
            controls
          />
          <video
            className="video-background"
            style={flipVideo ? { transform: "scaleX(-1)" } : undefined}
            ref={videoBackgroundRef}
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
        </section>
      </main>
    </div>
  );
}

export default App;
