import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';

const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const FULL_SCREEN_TRIGGER_BUTTON_TEXT = 'fullScreenTriggerButton';
const FULL_SCREEN_CONTENT_TEST_ID = 'fullScreenContent';

describe('FullScreenTrigger', () => {
  it('renders the FullScreenTrigger', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video />
        <ReactVideo.FullScreenTrigger>{FULL_SCREEN_TRIGGER_BUTTON_TEXT}</ReactVideo.FullScreenTrigger>
      </ReactVideo.Root>
    );

    expect(screen.getByRole('button')).toHaveTextContent(FULL_SCREEN_TRIGGER_BUTTON_TEXT);
  });

  it('full screen video on click', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.FullScreenContent data-testid={FULL_SCREEN_CONTENT_TEST_ID}>
          <ReactVideo.Video />
        </ReactVideo.FullScreenContent>
        <ReactVideo.FullScreenTrigger>{FULL_SCREEN_TRIGGER_BUTTON_TEXT}</ReactVideo.FullScreenTrigger>
      </ReactVideo.Root>
    );

    const fullScreenContent = screen.getByTestId(FULL_SCREEN_CONTENT_TEST_ID) as HTMLVideoElement;
    const fullScreenTriggerButton = screen.getByRole('button');

    fireEvent.click(fullScreenTriggerButton);

    expect(document.fullscreenElement).toBe(fullScreenContent);
  });

  it('After click, the FullScreenTrigger disappears.', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.FullScreenContent data-testid={FULL_SCREEN_CONTENT_TEST_ID}>
          <ReactVideo.Video />
        </ReactVideo.FullScreenContent>
        <ReactVideo.FullScreenTrigger>{FULL_SCREEN_TRIGGER_BUTTON_TEXT}</ReactVideo.FullScreenTrigger>
      </ReactVideo.Root>
    );

    const fullScreenTriggerButton = screen.getByRole('button');

    fireEvent.click(fullScreenTriggerButton);

    expect(fullScreenTriggerButton).not.toBeInTheDocument();
  });

  it('When the FullScreenTrigger is clicked, onFullScreenChange should be called with true.', () => {
    const handleFullscreenChange = vi.fn();

    render(
      <ReactVideo.Root onFullScreenChange={handleFullscreenChange} src={TEST_VIDEO_SRC}>
        <ReactVideo.FullScreenContent data-testid={FULL_SCREEN_CONTENT_TEST_ID}>
          <ReactVideo.Video />
        </ReactVideo.FullScreenContent>
        <ReactVideo.FullScreenTrigger>{FULL_SCREEN_TRIGGER_BUTTON_TEXT}</ReactVideo.FullScreenTrigger>
      </ReactVideo.Root>
    );

    const fullScreenTriggerButton = screen.getByRole('button');

    fireEvent.click(fullScreenTriggerButton);

    expect(handleFullscreenChange).toBeCalledWith(true);
  });
});
