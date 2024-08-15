import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';

const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const PLAY_BUTTON_TEXT = 'playButton';
const VIDEO_TEST_ID = 'video';

describe('Play', () => {
  it('renders the Play', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video />
        <ReactVideo.Play>{PLAY_BUTTON_TEXT}</ReactVideo.Play>
      </ReactVideo.Root>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(PLAY_BUTTON_TEXT);
  });

  it('Play video on click', async () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.Play />
      </ReactVideo.Root>
    );

    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;
    const playButton = screen.getByRole('button');

    fireEvent.click(playButton);

    expect(video.paused).toBe(false);
  });

  it('After clicking, the video should play and the Play should disappear.', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video />
        <ReactVideo.Play />
      </ReactVideo.Root>
    );

    const playButton = screen.getByRole('button');

    fireEvent.click(playButton);

    expect(playButton).not.toBeInTheDocument();
  });

  it('When the Play is clicked, onPlayChange should be called with true.', () => {
    const handlePlayChange = vi.fn();

    render(
      <ReactVideo.Root onPlayChange={handlePlayChange}>
        <ReactVideo.Video />
        <ReactVideo.Play />
      </ReactVideo.Root>
    );

    const playButton = screen.getByRole('button');

    fireEvent.click(playButton);

    expect(handlePlayChange).toBeCalledWith(true);
  });
});
