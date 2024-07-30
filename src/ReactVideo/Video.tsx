import { forwardRef, VideoHTMLAttributes } from 'react';
import { useReactVideoContext } from './reactVideoContext';
import { composeRefs } from '../utils/composeRefs';

export type VideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'controls' | 'muted'>;

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src: _src, ...rest }, ref) => {
  const { videoRef, src, muted } = useReactVideoContext('Video');

  return <video {...rest} src={_src || src} controls={false} muted={muted} ref={composeRefs(videoRef, ref)} />;
});
Video.displayName = 'Video';
