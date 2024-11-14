import sounds from '../sounds';
import music from "../music";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useUserInteraction } from "./hasInteracted";

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

let activeSounds: AudioBufferSourceNode[] = [];
let activeMusicSource: AudioBufferSourceNode | null = null;

const playSound = async (soundKey: string, isAllowed: boolean, paused: boolean = false): Promise<void> => {
  if (!isAllowed) return;

  if (paused) pausedSounds();

  const soundPaths = sounds.get(soundKey);
  if (soundPaths) {
    const randomIndex = Math.floor(Math.random() * soundPaths.length);
    const soundPath = soundPaths[randomIndex];

    try {
      const response = await fetch(soundPath);
      const arrayBuffer = await response.arrayBuffer();

      audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
        const soundSource = audioContext.createBufferSource();
        soundSource.buffer = audioBuffer;
        soundSource.connect(audioContext.destination);
        soundSource.start(0);

        activeSounds.push(soundSource);

        soundSource.onended = () => {
          activeSounds = activeSounds.filter(sound => sound !== soundSource);
        };
      }, (decodeError) => {
        console.error("Error decoding audio data:", decodeError);
      });
    } catch (fetchError) {
      console.error("Error fetching sound:", fetchError);
    }
  } else {
    console.error(`Sound with key "${soundKey}" does not exist.`);
  }
};

const playMusic = async (musicKey: string, isAllowed: boolean): Promise<void> => {
  if (!isAllowed) return;

  pausedMusic();

  const musicPath = music.get(musicKey);
  if (musicPath) {
    try {
      const response = await fetch(musicPath);
      const arrayBuffer = await response.arrayBuffer();

      audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
        activeMusicSource = audioContext.createBufferSource();
        activeMusicSource.buffer = audioBuffer;
        activeMusicSource.loop = true;

        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.5;
        activeMusicSource.connect(gainNode);
        gainNode.connect(audioContext.destination);

        activeMusicSource.start(0);
      }, (decodeError) => {
        console.error("Error decoding audio data:", decodeError);
      });
    } catch (fetchError) {
      console.error("Error fetching music:", fetchError);
    }
  } else {
    console.error(`Music with key "${musicKey}" does not exist.`);
  }
};

const pausedSounds = (): void => {
  activeSounds.forEach(sound => sound.stop());
  activeSounds = [];
};

const pausedMusic = (): void => {
  if (activeMusicSource) {
    activeMusicSource.stop();
    activeMusicSource = null;
  }
};

export const useSoundService = () => {
  const settings = useSelector((state: RootState) => state.settings.settings);
  const hasInteracted = useUserInteraction();

  return {
    playMusic: (musicKey: string) => hasInteracted ? setTimeout(() => playMusic(musicKey, settings?.music ?? false), 100) : null,
    playSound: (soundKey: string, paused: boolean = false) => hasInteracted ? playSound(soundKey, settings?.sound ?? false, paused) : null,
    pausedSounds,
    pausedMusic
  };
};
