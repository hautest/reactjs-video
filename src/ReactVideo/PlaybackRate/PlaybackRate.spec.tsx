import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';

const PALYBACK_RATE_TEXT = 'PlaybackRate';
const TEST_PLAYBACK_RATE = 2;
const VIDEO_ID = 'video';

describe('PlaybackRate', () => {
  it('renders the PlaybackRate', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.PlaybackRate>{() => <div>{PALYBACK_RATE_TEXT}</div>}</ReactVideo.PlaybackRate>
      </ReactVideo.Root>
    );

    expect(screen.getByText(PALYBACK_RATE_TEXT)).toBeInTheDocument();
  });

  it('Change playbackRate using setPlaybackRate', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video data-testid={VIDEO_ID} />
        <ReactVideo.PlaybackRate>
          {({ setPlaybackRate }) => <button onClick={() => setPlaybackRate?.(TEST_PLAYBACK_RATE)} />}
        </ReactVideo.PlaybackRate>
      </ReactVideo.Root>
    );

    const setPlaybackRateTrigger = screen.getByRole('button');

    fireEvent.click(setPlaybackRateTrigger);

    const video = screen.getByTestId(VIDEO_ID) as HTMLVideoElement;

    expect(video.playbackRate).toBe(TEST_PLAYBACK_RATE);
  });

  it('When the setPlaybackRate is clicked, onPlaybackRateChange should be called with TEST_PLAYBACK_RATE.', () => {
    const handlePlaybackRateChange = vi.fn();

    render(
      <ReactVideo.Root onPlaybackRateChange={handlePlaybackRateChange}>
        <ReactVideo.Video />
        <ReactVideo.PlaybackRate>
          {({ setPlaybackRate }) => <button onClick={() => setPlaybackRate?.(TEST_PLAYBACK_RATE)} />}
        </ReactVideo.PlaybackRate>
      </ReactVideo.Root>
    );

    const setPlaybackRateTrigger = screen.getByRole('button');

    fireEvent.click(setPlaybackRateTrigger);

    expect(handlePlaybackRateChange).toBeCalledWith(TEST_PLAYBACK_RATE);
  });
});
