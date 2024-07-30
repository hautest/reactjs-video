import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as ReactVideo from '../';
import { useEffect, useRef } from 'react';

const DATA_TESTID = 'video';
const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

describe('Video', () => {
  it('Video 렌더링', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video data-testid={DATA_TESTID} />
      </ReactVideo.Root>
    );
    expect(screen.getByTestId(DATA_TESTID)).toBeInTheDocument();
  });

  it('Video에 src가 잘 전달되는지', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.Video data-testid={DATA_TESTID} />
      </ReactVideo.Root>
    );
    expect(screen.getByTestId(DATA_TESTID)).toHaveProperty('src', TEST_VIDEO_SRC);
  });

  it('muted 기능이 잘 동작하는지', () => {
    render(
      <ReactVideo.Root defaultMuted>
        <ReactVideo.Video data-testid={DATA_TESTID} />
      </ReactVideo.Root>
    );
    expect(screen.getByTestId(DATA_TESTID)).toHaveProperty('muted', true);
  });

  it('ref를 직접 사용 가능한지', () => {
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
