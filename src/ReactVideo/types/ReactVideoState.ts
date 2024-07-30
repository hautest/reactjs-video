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
  //speed
  playbackRate: number;
  defaultPlaybackRate: number;
  setPlaybackRate: Dispatch<SetStateAction<number | undefined>>;
  //fullScreen
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  //muted
  muted: boolean;
  defaultMuted: boolean;
  setMuted: Dispatch<SetStateAction<boolean | undefined>>;
  //PIP
  isPIP: boolean;
  setIsPIP: Dispatch<SetStateAction<boolean>>;
  //currentTime
  currentTime: number;
  defaultCurrentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number | undefined>>;
  //
  src: string;
}
