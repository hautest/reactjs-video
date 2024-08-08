import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as ReactVideo from '../';
import { useEffect, useRef } from 'react';

const DATA_TESTID = 'video';
const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

describe('Video', () => {
  it('renders the Video', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video data-testid={DATA_TESTID} />
      </ReactVideo.Root>
    );
    expect(screen.getByTestId(DATA_TESTID)).toBeInTheDocument();
  });

  it('passes src to the Video component correctly', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video data-testid={DATA_TESTID} />
      </ReactVideo.Root>
    );
    expect(screen.getByTestId(DATA_TESTID)).toHaveProperty('src', TEST_VIDEO_SRC);
  });

  it('checks if the muted property works correctly', () => {
    render(
      <ReactVideo.Root defaultMuted>
        <ReactVideo.Video data-testid={DATA_TESTID} />
      </ReactVideo.Root>
    );
    expect(screen.getByTestId(DATA_TESTID)).toHaveProperty('muted', true);
  });

  it('allows using ref directly', () => {
    const VideoWithRef = () => {
      const videoRef = useRef<HTMLVideoElement>(null);

      useEffect(() => {
        if (videoRef.current) {
          videoRef.current.playbackRate = 2.0;
        }
      }, [videoRef]);

      return (
        <ReactVideo.Root>
          <ReactVideo.Video ref={videoRef} data-testid={DATA_TESTID} />
        </ReactVideo.Root>
      );
    };

    render(<VideoWithRef />);

    expect((screen.getByTestId(DATA_TESTID) as HTMLVideoElement).playbackRate).toBe(2.0);
  });
});
