import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';

const VOLUME_RATE_TEXT = 'Volume';
const TEST_VOLUME_VALUE = 0.5;
const VIDEO_ID = 'video';

describe('Volume', () => {
  it('renders the Volume', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Volume>{() => <div>{VOLUME_RATE_TEXT}</div>}</ReactVideo.Volume>
      </ReactVideo.Root>
    );

    expect(screen.getByText(VOLUME_RATE_TEXT)).toBeInTheDocument();
  });

  it('Change volume using setVolume', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video data-testid={VIDEO_ID} />
        <ReactVideo.Volume>
          {({ setVolume }) => <button onClick={() => setVolume?.(TEST_VOLUME_VALUE)} />}
        </ReactVideo.Volume>
      </ReactVideo.Root>
    );

    const setVolumeTrigger = screen.getByRole('button');

    fireEvent.click(setVolumeTrigger);

    const video = screen.getByTestId(VIDEO_ID) as HTMLVideoElement;

    expect(video.volume).toBe(TEST_VOLUME_VALUE);
  });

  it('When the setVolume is clicked, onVolumeChange should be called with TEST_VOLUME_VALUE.', () => {
    const handleVolumeChange = vi.fn();

    render(
      <ReactVideo.Root onVolumeChange={handleVolumeChange}>
        <ReactVideo.Video />
        <ReactVideo.Volume>
          {({ setVolume }) => <button onClick={() => setVolume?.(TEST_VOLUME_VALUE)} />}
        </ReactVideo.Volume>
      </ReactVideo.Root>
    );

    const setVolumeTrigger = screen.getByRole('button');

    fireEvent.click(setVolumeTrigger);

    expect(handleVolumeChange).toBeCalledWith(TEST_VOLUME_VALUE);
  });
});
