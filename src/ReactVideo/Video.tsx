import { forwardRef, VideoHTMLAttributes } from 'react';
import { useReactVideoContext } from './reactVideoContext';
import { composeRefs } from '../utils/composeRefs';

export type VideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'controls'>;

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src: _src, ...rest }, ref) => {
  const { videoRef, src } = useReactVideoContext('Video');
  const composedRef = composeRefs(videoRef, ref);

  return <video {...rest} src={_src || src} controls={false} ref={composedRef} />;
});
Video.displayName = 'Video';
