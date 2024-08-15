import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';

const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const RESET_BUTTON_TEXT = 'resetButton';
const VIDEO_TEST_ID = 'video';
const DEFAULT_CURRENT_TIME = 50;

describe('Reset', () => {
  it('renders the Reset', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video />
        <ReactVideo.Reset>{RESET_BUTTON_TEXT}</ReactVideo.Reset>
      </ReactVideo.Root>
    );

    expect(screen.getByRole('button')).toHaveTextContent(RESET_BUTTON_TEXT);
  });

  it('Reset video on click', () => {
    render(
      <ReactVideo.Root defaultCurrentTime={DEFAULT_CURRENT_TIME} src={TEST_VIDEO_SRC}>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.Reset />
      </ReactVideo.Root>
    );

    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;
    const resetButton = screen.getByRole('button');

    fireEvent.click(resetButton);

    expect(video.currentTime).toBe(0);
  });

  it('When remainPlayState is true, the play state should be maintained.', () => {
    render(
      <ReactVideo.Root muted defaultPlay defaultCurrentTime={DEFAULT_CURRENT_TIME} src={TEST_VIDEO_SRC}>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.Reset remainPlayState />
      </ReactVideo.Root>
    );

    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;
    const resetButton = screen.getByRole('button');

    fireEvent.click(resetButton);

    expect(video.paused).toBe(false);
  });

  it('When remainPlayState is false, the play state should be reversed.', () => {
    render(
      <ReactVideo.Root muted defaultPlay defaultCurrentTime={DEFAULT_CURRENT_TIME} src={TEST_VIDEO_SRC}>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.Reset remainPlayState={false} />
      </ReactVideo.Root>
    );

    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;
    const resetButton = screen.getByRole('button');

    fireEvent.click(resetButton);

    expect(video.paused).toBe(true);
  });

  it('When the Reset clicked, onReset should be called', () => {
    const handleReset = vi.fn();

    render(
      <ReactVideo.Root
        onReset={handleReset}
        muted
        defaultPlay
        defaultCurrentTime={DEFAULT_CURRENT_TIME}
        src={TEST_VIDEO_SRC}
      >
        <ReactVideo.Video />
        <ReactVideo.Reset />
      </ReactVideo.Root>
    );

    const resetButton = screen.getByRole('button');

    fireEvent.click(resetButton);

    expect(handleReset).toBeCalled();
  });
});
