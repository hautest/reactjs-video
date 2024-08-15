import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';
import { useState } from 'react';

const VIDEO_TEST_ID = 'video';

describe('MutedClose', () => {
  it('Does not render the MutedClose', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.MutedClose />
      </ReactVideo.Root>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Muted video on click', () => {
    render(
      <ReactVideo.Root defaultMuted>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.MutedClose />
      </ReactVideo.Root>
    );
    const mutedClose = screen.getByRole('button');
    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;

    fireEvent.click(mutedClose);

    expect(video.muted).toBe(false);
  });

  it('After not muting, the MutedClose should disappear.', () => {
    render(
      <ReactVideo.Root defaultMuted>
        <ReactVideo.Video />
        <ReactVideo.MutedClose />
      </ReactVideo.Root>
    );
    const mutedClose = screen.getByRole('button');

    fireEvent.click(mutedClose);

    expect(mutedClose).not.toBeInTheDocument();
  });

  it('When the MutedClose is clicked, onMutedChange should be called with true.', () => {
    const handleMutedChange = vi.fn();

    render(
      <ReactVideo.Root defaultMuted onMutedChange={handleMutedChange}>
        <ReactVideo.Video />
        <ReactVideo.MutedClose />
      </ReactVideo.Root>
    );

    const MutedClose = screen.getByRole('button');

    fireEvent.click(MutedClose);

    expect(handleMutedChange).toBeCalledWith(false);
  });

  it('Manage the muted value via props', () => {
    const { result } = renderHook(() => useState(true));

    render(
      <ReactVideo.Root muted={result.current[0]} onMutedChange={result.current[1]}>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.MutedClose />
      </ReactVideo.Root>
    );

    const mutedClose = screen.getByRole('button');
    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;

    fireEvent.click(mutedClose);

    expect(video.muted).toBe(false);
    expect(result.current[0]).toBe(false);
  });
});
