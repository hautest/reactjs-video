import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';
import { useState } from 'react';

const VIDEO_TEST_ID = 'video';

describe('MutedTrigger', () => {
  it('renders the MutedTrigger', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.MutedTrigger />
      </ReactVideo.Root>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Muted video on click', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.MutedTrigger />
      </ReactVideo.Root>
    );
    const mutedTrigger = screen.getByRole('button');
    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;

    fireEvent.click(mutedTrigger);

    expect(video.muted).toBe(true);
  });

  it('After muting, the MutedTrigger should disappear.', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.MutedTrigger />
      </ReactVideo.Root>
    );
    const mutedTrigger = screen.getByRole('button');

    fireEvent.click(mutedTrigger);

    expect(mutedTrigger).not.toBeInTheDocument();
  });

  it('When the MutedTrigger is clicked, onMutedChange should be called with true.', () => {
    const handleMutedChange = vi.fn();

    render(
      <ReactVideo.Root onMutedChange={handleMutedChange}>
        <ReactVideo.Video />
        <ReactVideo.MutedTrigger />
      </ReactVideo.Root>
    );

    const mutedTrigger = screen.getByRole('button');

    fireEvent.click(mutedTrigger);

    expect(handleMutedChange).toBeCalledWith(true);
  });

  it('Manage the muted value via props', () => {
    const { result } = renderHook(() => useState(false));

    render(
      <ReactVideo.Root muted={result.current[0]} onMutedChange={result.current[1]}>
        <ReactVideo.Video data-testid={VIDEO_TEST_ID} />
        <ReactVideo.MutedTrigger />
      </ReactVideo.Root>
    );

    const mutedTrigger = screen.getByRole('button');
    const video = screen.getByTestId(VIDEO_TEST_ID) as HTMLVideoElement;

    fireEvent.click(mutedTrigger);

    expect(video.muted).toBe(true);
    expect(result.current[0]).toBe(true);
  });
});
