import { forwardRef, useEffect, VideoHTMLAttributes } from 'react';
import { useReactVideoContext } from './reactVideoContext';
import { composeRefs } from '../utils/composeRefs';
import { isProd } from '../utils/isProd';

export type VideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'controls'>;

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src: _src, muted: _muted, ...rest }, ref) => {
  const { videoRef, src, autoPlay, play } = useReactVideoContext('Video');
  const composedRef = composeRefs(videoRef, ref);

  // Synchronizing the isPlaying state with the video state
  useEffect(() => {
    if (!isProd && autoPlay && !_muted) {
      console.error(
        'The autoplay feature only works when the mute attribute is set to true. Please add the muted={true} prop to the `ReactVideo.Video` component.'
      );
    }
    if (play && videoRef?.current) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [_muted, play, autoPlay, videoRef]);

  return <video {...rest} src={_src || src} controls={false} muted={_muted} ref={composedRef} />;
});
Video.displayName = 'Video';
