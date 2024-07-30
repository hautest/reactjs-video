export interface ReactVideoEvent {
  onError: () => void;
  onReset: () => void;
  onFullScreenChange: (isFullScreen: boolean) => void;
  onPlaybackRateChange: () => void;
  onTrackChange: () => void;
  onPlayChange: (isPlaying: boolean) => void;
  onVolumeChange: (volume: number) => void;
  onProgressChange: (progress: number) => void;
  onMutedChange: (muted: boolean) => void;
  onPIPChange: (isPIP: boolean) => void;
}
