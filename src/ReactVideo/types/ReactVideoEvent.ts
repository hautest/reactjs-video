export interface ReactVideoEvent {
  onStart: () => void;
  onStop: () => void;
  onProgress: () => void;
  onError: () => void;
  onReset: () => void;
  onScreenModeChange: () => void;
  onSpeedChange: () => void;
  onTrackChange: () => void;
}
