import { Dispatch, SetStateAction } from 'react';

export interface ReactVideoState {
  //play
  play: boolean;
  defaultPlay: boolean;
  setPlay: Dispatch<SetStateAction<boolean | undefined>>;
  //volume
  volume: number;
  defaultVolume: number;
  setVolume: Dispatch<SetStateAction<number | undefined>>;
  //progress
  progress: number;
  defaultProgress: number;
  setProgress: Dispatch<SetStateAction<number | undefined>>;
  //speed
  speed: number;
  defaultSpeed: number;
  setSpeed: Dispatch<SetStateAction<number | undefined>>;
  //fullScreen
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  //
  src: string;
}
