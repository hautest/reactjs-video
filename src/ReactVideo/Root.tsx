import { useMemo, useRef, useState } from 'react';
import { ReactVideoProvider } from './reactVideoContext';
import { ReactVideoEvent } from './types/ReactVideoEvent';
import { ReactVideoState } from './types/ReactVideoState';
import { WithChildren } from './types/WithChildren';

export type RootProps = Partial<ReactVideoEvent> &
  Partial<Pick<ReactVideoState, 'progress' | 'speed' | 'volume' | 'src'>> &
  WithChildren;

export const Root = ({
  volume: _volume = 1.0,
  progress: _progress = 0,
  speed: _speed = 1,
  src = '',
  children,
}: RootProps) => {
  // Most browsers restrict autoplaying videos without user interaction, setting it to false by default.
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(_volume);
  const [progress, setProgress] = useState(_progress);
  const [speed, setSpeed] = useState(_speed);

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <ReactVideoProvider
      value={useMemo(
        () => ({ isPlaying, setIsPlaying, videoRef, volume, setVolume, progress, setProgress, speed, setSpeed, src }),
        [isPlaying, progress, speed, src, volume]
      )}
    >
      {children}
    </ReactVideoProvider>
  );
};
Root.displayName = 'Root';
