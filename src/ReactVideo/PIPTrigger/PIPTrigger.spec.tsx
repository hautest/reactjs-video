import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';

const VIDEO_ID = 'video';

describe('PIPTrigger', () => {
  it('renders the PIPTrigger', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.PIPTrigger />
      </ReactVideo.Root>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('PIP video on click', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video data-testid={VIDEO_ID} />
        <ReactVideo.PIPTrigger />
      </ReactVideo.Root>
    );

    const pipButton = screen.getByRole('button');
    const video = screen.getByTestId(VIDEO_ID);
    fireEvent.click(pipButton);

    expect(document.pictureInPictureElement).toBe(video);
  });

  it('After click, the PIPTrigger disappears.', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.PIPTrigger />
      </ReactVideo.Root>
    );

    const pipButton = screen.getByRole('button');
    fireEvent.click(pipButton);

    expect(pipButton).not.toBeInTheDocument();
  });

  it('When the PIPTrigger is clicked, onPIPChange should be called with true.', () => {
    const handlePIPChange = vi.fn();

    render(
      <ReactVideo.Root onPIPChange={handlePIPChange}>
        <ReactVideo.Video />
        <ReactVideo.PIPTrigger />
      </ReactVideo.Root>
    );

    const pipTriggerButton = screen.getByRole('button');

    fireEvent.click(pipTriggerButton);

    expect(handlePIPChange).toBeCalledWith(true);
  });
});
