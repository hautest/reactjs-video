import { useEffect, useMemo, useRef, useState } from 'react';
import { ReactVideoProvider } from './reactVideoContext';
import { ReactVideoEvent } from './types/ReactVideoEvent';
import { ReactVideoState } from './types/ReactVideoState';
import { WithChildren } from './types/WithChildren';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { isProd } from '../utils/isProd';

export type RootProps = Partial<ReactVideoEvent> &
  Partial<
    Omit<
      ReactVideoState,
      | 'setPlay'
      | 'setVolume'
      | 'setProgress'
      | 'setSpeed'
      | 'setMuted'
      | 'isPIP'
      | 'setIsPIP'
      | 'isFullScreen'
      | 'setIsFullScreen'
      | 'setCurrentTime'
      | 'setPlaybackRate'
    >
  > &
  WithChildren;

export const Root = ({
  volume: _volume,
  currentTime: _currentTime,
  playbackRate: _playbackRate,
  src = '',
  play: _play,
  muted: _muted,
  children,
  onPlayChange,
  onVolumeChange,
  onCurrentTimeChange,
  onPlaybackRateChange,
  onMutedChange,
  onReset,
  onPIPChange,
  onFullScreenChange,
  defaultPlay,
  defaultVolume,
  defaultCurrentTime,
  defaultPlaybackRate,
  defaultMuted,
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
  const [currentTime, setCurrentTime] = useControllableState({
    prop: _currentTime,
    defaultProp: defaultCurrentTime,
    onChange: onCurrentTimeChange,
  });
  const [playbackRate, setPlaybackRate] = useControllableState({
    prop: _playbackRate,
    defaultProp: defaultPlaybackRate,
    onChange: onPlaybackRateChange,
  });
  const [muted, setMuted] = useControllableState({
    defaultProp: defaultMuted,
    prop: _muted,
    onChange: onMutedChange,
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const fullScreenContentRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [isPIP, setIsPIP] = useState(false);

  useEffect(() => {
    if (!isProd && (_play || defaultPlay) && !muted) {
      console.error(
        'The autoplay feature only works when the mute attribute is set to true. Please add the muted={true} or defaultMuted={true} props to the `ReactVideo.Root` component.'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Synchronizing the play state with the video state
  useEffect(() => {
    if (play && videoRef?.current && videoRef?.current.paused) {
      videoRef?.current?.play();
    }
    if (!play && videoRef?.current && !videoRef?.current.paused) {
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
    const handleEnterPIP = () => {
      onPIPChange?.(true);
      setIsPIP?.(true);
    };
    const hanldeLeavePIP = () => {
      onPIPChange?.(false);
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
  }, [onPIPChange, setPlay]);

  useEffect(() => {
    if (videoRef?.current && playbackRate !== undefined) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, videoRef]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullScreen = document.fullscreenElement !== null;
      setIsFullScreen?.(isFullScreen);
      onFullScreenChange?.(isFullScreen);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onFullScreenChange, setIsFullScreen]);

  useEffect(() => {
    if (currentTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <ReactVideoProvider
      value={useMemo(
        () => ({
          play,
          setPlay,
          videoRef,
          volume,
          setVolume,
          currentTime,
          setCurrentTime,
          playbackRate,
          setPlaybackRate,
          src,
          fullScreenContentRef,
          isFullScreen,
          setIsFullScreen,
          muted,
          setMuted,
          isPIP,
          setIsPIP,
          onReset,
        }),
        [
          currentTime,
          isFullScreen,
          isPIP,
          muted,
          onReset,
          play,
          playbackRate,
          setCurrentTime,
          setMuted,
          setPlay,
          setPlaybackRate,
          setVolume,
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
