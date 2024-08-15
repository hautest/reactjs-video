import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';

describe('PIPClose', () => {
  it('Does not render the PIPClose', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.PIPClose />
      </ReactVideo.Root>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Leave PIP on click', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.PIPTrigger />
        <ReactVideo.PIPClose />
      </ReactVideo.Root>
    );

    const pipTrigger = screen.getByRole('button');
    fireEvent.click(pipTrigger);

    const pipClose = screen.getByRole('button');
    fireEvent.click(pipClose);

    expect(document.pictureInPictureElement).toBe(null);
  });

  it('When the PIPClose is clicked, onPIPChange should be called with false.', () => {
    const handlePIPChange = vi.fn();

    render(
      <ReactVideo.Root onPIPChange={handlePIPChange}>
        <ReactVideo.Video />
        <ReactVideo.PIPTrigger />
        <ReactVideo.PIPClose />
      </ReactVideo.Root>
    );

    const pipTrigger = screen.getByRole('button');
    fireEvent.click(pipTrigger);

    const pipClose = screen.getByRole('button');
    fireEvent.click(pipClose);

    expect(handlePIPChange).toBeCalledWith(false);
  });
});
