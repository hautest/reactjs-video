import { useMemo, useRef, useState } from 'react';
import { ReactVideoProvider } from './reactVideoContext';
import { ReactVideoEvent } from './types/ReactVideoEvent';
import { ReactVideoState } from './types/ReactVideoState';
import { WithChildren } from './types/WithChildren';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

export type RootProps = Partial<ReactVideoEvent> &
  Partial<Omit<ReactVideoState, 'setPlay' | 'setVolume' | 'setProgress' | 'setSpeed'>> &
  WithChildren;

export const Root = ({
  volume: _volume,
  progress: _progress,
  speed: _speed,
  src = '',
  play: _play,
  children,
  onPlayChange,
  onVolumeChange,
  onProgressChange,
  onSpeedChange,
  defaultPlay,
  defaultVolume,
  defaultProgress,
  defaultSpeed,
}: RootProps) => {
  const [play, setPlay] = useControllableState({
    prop: _play,
    onChange: onPlayChange,
    defaultProp: defaultPlay,
  });
  const [volume, setVolume] = useControllableState({
    prop: _volume,
    defaultProp: defaultVolume,
    onChange: onVolumeChange,
  });
  const [progress, setProgress] = useControllableState({
    prop: _progress,
    defaultProp: defaultProgress,
    onChange: onProgressChange,
  });
  const [speed, setSpeed] = useControllableState({
    prop: _speed,
    defaultProp: defaultSpeed,
    onChange: onSpeedChange,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const fullScreenContentRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <ReactVideoProvider
      value={useMemo(
        () => ({
          play,
          setPlay,
          videoRef,
          volume,
          setVolume,
          progress,
          setProgress,
          speed,
          setSpeed,
          src,
          autoPlay: _play || defaultPlay,
          fullScreenContentRef,
          isFullScreen,
          setIsFullScreen,
        }),
        [
          _play,
          defaultPlay,
          isFullScreen,
          play,
          progress,
          setPlay,
          setProgress,
          setSpeed,
          setVolume,
          speed,
          src,
          volume,
        ]
      )}
    >
      {children}
    </ReactVideoProvider>
  );
};
Root.displayName = 'Root';
