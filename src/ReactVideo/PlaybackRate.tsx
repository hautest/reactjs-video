import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useReactVideoContext } from './reactVideoContext';

export interface PlaybackRateChildProps {
  setPlaybackRate?: Dispatch<SetStateAction<number | undefined>>;
  playbackRate?: number;
}

export interface PlaybackRateProps {
  children: (props: PlaybackRateChildProps) => ReactNode;
}

export const PlaybackRate = ({ children }: PlaybackRateProps) => {
  const { playbackRate, setPlaybackRate } = useReactVideoContext('PlaybackRate');

  return children({ playbackRate, setPlaybackRate });
};
PlaybackRate.displayName = 'PlaybackRate';
