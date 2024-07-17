import { forwardRef, useMemo, useState, VideoHTMLAttributes } from 'react';
import { ReactVideoContext, ReactVideoProvider } from './reactVideoContext';

export type RootProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'controls'> & Partial<ReactVideoContext>;

export const Root = forwardRef<HTMLVideoElement, RootProps>(({ isPlaying: _isPlaying = false, ...rest }, ref) => {
  const [isPlaying, setIsPlaying] = useState(_isPlaying);

  return (
    <ReactVideoProvider value={useMemo(() => ({ isPlaying, setIsPlaying }), [isPlaying, setIsPlaying])}>
      <video {...rest} controls={false} ref={ref} />
    </ReactVideoProvider>
  );
});
Root.displayName = 'ReactVideo';
