import { forwardRef, useEffect, VideoHTMLAttributes } from 'react';
import { useReactVideoContext } from './reactVideoContext';
import { composeRefs } from '../utils/composeRefs';
import { isProd } from '../utils/isProd';

export type VideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'controls' | 'muted'>;

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src: _src, ...rest }, ref) => {
  const { videoRef, src, autoPlay, play, volume, muted, setIsPIP, setPlay } = useReactVideoContext('Video');
  const composedRef = composeRefs(videoRef, ref);

  useEffect(() => {
    if (!isProd && autoPlay && !muted) {
      console.error(
        'The autoplay feature only works when the mute attribute is set to true. Please add the muted={true} or defaultMuted={true} props to the `ReactVideo.Root` component.'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Synchronizing the play state with the video state
  useEffect(() => {
    if (play && videoRef?.current) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [play, videoRef]);

  // Synchronizing the volume state with the video state
  useEffect(() => {
    if (volume && videoRef?.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume;
    }
  }, [videoRef, volume]);

  useEffect(() => {
    const handleEnterPIP = () => setIsPIP?.(true);
    const hanldeLeavePIP = () => {
      setIsPIP?.(false);
      setPlay?.(false);
    };

    videoRef?.current?.addEventListener('enterpictureinpicture', handleEnterPIP);
    videoRef?.current?.addEventListener('leavepictureinpicture', hanldeLeavePIP);

    return () => {
      videoRef?.current?.removeEventListener('enterpictureinpicture', handleEnterPIP);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      videoRef?.current?.removeEventListener('leavepictureinpicture', hanldeLeavePIP);
    };
  }, [setIsPIP, setPlay, videoRef]);

  return <video {...rest} src={_src || src} controls={false} muted={muted} ref={composedRef} />;
});
Video.displayName = 'Video';
