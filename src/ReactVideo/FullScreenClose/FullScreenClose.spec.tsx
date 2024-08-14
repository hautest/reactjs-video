import { fireEvent, render, screen } from '@testing-library/react';
import * as ReactVideo from '../';
import { describe, expect, it } from 'vitest';

const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

describe('FullScreenClose', () => {
  it('renders the FullScreenTrigger', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video />
        <ReactVideo.FullScreenClose />
      </ReactVideo.Root>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('exit full screen on click', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.FullScreenContent>
          <ReactVideo.Video />
          <ReactVideo.FullScreenClose />
        </ReactVideo.FullScreenContent>
        <ReactVideo.FullScreenTrigger />
      </ReactVideo.Root>
    );

    const fullScreenTriggerButton = screen.getByRole('button');

    fireEvent.click(fullScreenTriggerButton);

    const fullScreenCloseButton = screen.getByRole('button');
    fireEvent.click(fullScreenCloseButton);
    expect(document.fullscreenElement).toBe(null);
  });

  it('After click, the FullScreenClose disappears.', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.FullScreenContent>
          <ReactVideo.Video />
          <ReactVideo.FullScreenClose />
        </ReactVideo.FullScreenContent>
        <ReactVideo.FullScreenTrigger />
      </ReactVideo.Root>
    );

    const fullScreenTriggerButton = screen.getByRole('button');

    fireEvent.click(fullScreenTriggerButton);

    const fullScreenCloseButton = screen.getByRole('button');
    fireEvent.click(fullScreenCloseButton);

    expect(fullScreenCloseButton).not.toBeInTheDocument();
  });
});
