import { Box } from '@mantine/core';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { useEffect, useRef, useState } from 'react';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

export function Visualizer() {
  const {
    settings: { shouldEnable, visualizer },
  } = useSettings();
  const { stream } = useStream();
  const [showVisualizer, setShowVisualizer] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      containerRef.current &&
      stream &&
      shouldEnable.microphone &&
      visualizer
    ) {
      const analyzer = new AudioMotionAnalyzer(containerRef.current, {
        mode: 10,
        bgAlpha: 0,
        fillAlpha: 0.3,
        gradient: 'rainbow',
        lineWidth: 2,
        lumiBars: false,
        maxFreq: 22000,
        radial: false,
        reflexAlpha: 1,
        reflexBright: 1,
        reflexRatio: 0.5,
        showBgColor: false,
        showScaleX: false,
        showPeaks: false,
        overlay: true,
      });
      analyzer.connectInput(analyzer.audioCtx.createMediaStreamSource(stream));
      analyzer.disconnectOutput();

      const volumeMonitorStop = monitorMicrophoneVolume(
        stream,
        (volume) => setShowVisualizer(volume > 0.1),
        10
      );
      return () => {
        analyzer.destroy();
        volumeMonitorStop();
      };
    }
  }, [stream, shouldEnable.microphone, visualizer]);

  if (!visualizer) {
    return <></>;
  }

  return (
    <Box
      ref={containerRef}
      w="100%"
      h="100%"
      style={{
        zIndex: 9,
        position: 'absolute',
        visibility: showVisualizer ? 'visible' : 'hidden',
      }}
    />
  );
}

function monitorMicrophoneVolume(
  stream: MediaStream,
  callback: (volume: number) => void,
  interval: number = 100
): () => void {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  microphone.connect(analyser);
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  let lastVolume = -1;

  const analyzeVolume = () => {
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / bufferLength);

    // Normalize the volume
    const volume = rms / 128;

    if (Math.abs(volume - lastVolume) > 0.01 || lastVolume === -1) {
      callback(volume);
      lastVolume = volume;
    }
  };

  const intervalId = setInterval(analyzeVolume, interval);

  return () => {
    clearInterval(intervalId);
    audioContext.close();
  };
}
