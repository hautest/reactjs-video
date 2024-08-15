import { describe, expect, it, vi } from 'vitest';
import * as ReactVideo from '../';
import { fireEvent, render, screen } from '@testing-library/react';

const VIDEO_ID = 'video';
const CHANGED_CURRENT_TIME = 10;

describe('CurrentTime', () => {
  it('renders the CurrentTime', () => {
    const CURRENT_TIME_TEXT = 'currentTime';
    render(
      <ReactVideo.Root>
        <ReactVideo.Video />
        <ReactVideo.CurrentTime>{() => <div>{CURRENT_TIME_TEXT}</div>}</ReactVideo.CurrentTime>
      </ReactVideo.Root>
    );

    expect(screen.getByText(CURRENT_TIME_TEXT)).toBeInTheDocument();
  });

  it('Change currentTime using setCurrentTime', () => {
    render(
      <ReactVideo.Root>
        <ReactVideo.Video data-testid={VIDEO_ID} />
        <ReactVideo.CurrentTime>
          {({ setCurrentTime }) => <button onClick={() => setCurrentTime?.(CHANGED_CURRENT_TIME)} />}
        </ReactVideo.CurrentTime>
      </ReactVideo.Root>
    );

    const setCurrentTimeTrigger = screen.getByRole('button');
    const video = screen.getByTestId(VIDEO_ID) as HTMLVideoElement;

    fireEvent.click(setCurrentTimeTrigger);

    expect(video.currentTime).toBe(CHANGED_CURRENT_TIME);
  });

  it('When the setCurrentTime is clicked, onCurrentTimeChange should be called with CHANGED_CURRENT_TIME.', () => {
    const handleCurrentTimeChange = vi.fn();

    render(
      <ReactVideo.Root onCurrentTimeChange={handleCurrentTimeChange}>
        <ReactVideo.Video />
        <ReactVideo.CurrentTime>
          {({ setCurrentTime }) => <button onClick={() => setCurrentTime?.(CHANGED_CURRENT_TIME)} />}
        </ReactVideo.CurrentTime>
      </ReactVideo.Root>
    );

    const setCurrentTimeTrigger = screen.getByRole('button');

    fireEvent.click(setCurrentTimeTrigger);

    expect(handleCurrentTimeChange).toBeCalledWith(CHANGED_CURRENT_TIME);
  });
});
