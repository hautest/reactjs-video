import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import * as ReactVideo from '../';

const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const PAUSE_BUTTON_TEXT = 'pauseButton';
const VIDEO_TEST_ID = 'video';

describe('Pause', () => {
  it('renders the Pause', () => {
    render(
      <ReactVideo.Root defaultPlay src={TEST_VIDEO_SRC}>
        <ReactVideo.Video />
        <ReactVideo.Pause>{PAUSE_BUTTON_TEXT}</ReactVideo.Pause>
      </ReactVideo.Root>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(PAUSE_BUTTON_TEXT);
  });

  it('Puase video on click', () => {
    render(
      <ReactVideo.Root muted defaultPlay src={TEST_VIDEO_SRC}>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.Pause />
      </ReactVideo.Root>
    );

    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;
    const pauseButton = screen.getByRole('button');

    fireEvent.click(pauseButton);

    expect(video.paused).toBe(true);
  });

  it('After clicking, the video should pause and the Pause should disappear.', () => {
    render(
      <ReactVideo.Root defaultPlay src={TEST_VIDEO_SRC}>
        <ReactVideo.Video />
        <ReactVideo.Pause />
      </ReactVideo.Root>
    );

    const pauseButton = screen.getByRole('button');

    fireEvent.click(pauseButton);

    expect(pauseButton).not.toBeInTheDocument();
  });
});
