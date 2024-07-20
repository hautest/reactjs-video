import { Dispatch, SetStateAction } from 'react';

export interface ReactVideoState {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  src: string;
}
