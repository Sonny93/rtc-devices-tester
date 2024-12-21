import { Box } from '@mantine/core';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { useEffect, useRef, useState } from 'react';
import useStream from '~/hooks/stream/use_stream';
import useSettings from '~/hooks/use_settings';

export function Visualizer() {
  const {
    settings: { shouldEnable },
  } = useSettings();
  const { stream } = useStream();
  const [showVisualizer, setShowVisualizer] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && stream && shouldEnable.microphone) {
      const analyzer = new AudioMotionAnalyzer(containerRef.current, {
        mode: 10,
        bgAlpha: 0.7,
        fillAlpha: 0.6,
        gradient: 'rainbow',
        lineWidth: 2,
        lumiBars: false,
        maxFreq: 16000,
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
      monitorMicrophoneVolume(
        stream,
        (volume) => setShowVisualizer(volume > 0.1),
        10
      );
      return () => analyzer.destroy();
    }
  }, [stream, shouldEnable.microphone]);

  return (
    <Box
      ref={containerRef}
      w="100%"
      h="338px"
      style={{
        position: 'absolute',
        visibility: showVisualizer ? 'visible' : 'hidden',
      }}
    />
  );
}

function monitorMicrophoneVolume(
  stream: MediaStream,
  callback: (volume: number) => void,
  interval: number = 100 // Intervalle en ms (par défaut 100ms)
): () => void {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  // Connecter le microphone à l'analyseur
  microphone.connect(analyser);

  analyser.fftSize = 256; // Taille de la fenêtre de Fourier
  const bufferLength = analyser.frequencyBinCount;

  let lastVolume = -1; // Stocke le dernier volume pour détecter les changements

  // Fonction pour analyser le volume en continu
  const analyzeVolume = () => {
    analyser.getByteFrequencyData(dataArray);

    // Calcul du volume moyen (RMS - Root Mean Square)
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / bufferLength);

    // Normaliser le volume (0 à 1)
    const volume = rms / 128;

    // Appeler la fonction callback uniquement si le volume a changé ou après l'intervalle spécifié
    if (Math.abs(volume - lastVolume) > 0.01 || lastVolume === -1) {
      callback(volume);
      lastVolume = volume;
    }
  };

  // Répéter l'analyse à l'intervalle donné
  const intervalId = setInterval(analyzeVolume, interval);

  // Retourne une fonction pour arrêter le suivi
  return () => {
    clearInterval(intervalId);
    audioContext.close();
  };
}
