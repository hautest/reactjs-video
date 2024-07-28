export interface ReactVideoEvent {
  onError: () => void;
  onReset: () => void;
  onScreenModeChange: () => void;
  onSpeedChange: () => void;
  onTrackChange: () => void;
  onPlayChange: (isPlaying: boolean) => void;
  onVolumeChange: (volume: number) => void;
  onProgressChange: (progress: number) => void;
  onMutedChange: (muted: boolean) => void;
}
