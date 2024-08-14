import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as ReactVideo from '../';

const TEST_VIDEO_SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const FULL_SCREEN_CONTENT_TEST_ID = 'fullScreenContent';

const DATA_TEST_ID_1 = 'div1';
const DATA_TEST_ID_2 = 'div2';
const DATA_TEST_ID_3 = 'div3';

describe('FullScreenContent', () => {
  it('renders the FullScreenContent', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.FullScreenContent data-testid={FULL_SCREEN_CONTENT_TEST_ID}>
          <ReactVideo.Video />
        </ReactVideo.FullScreenContent>
      </ReactVideo.Root>
    );

    const fullScreenContent = screen.getByTestId(FULL_SCREEN_CONTENT_TEST_ID);

    expect(fullScreenContent).toBeInTheDocument();
  });

  it('FullScreenContent should be rendered when in fullscreen mode.', () => {
    render(
      <ReactVideo.Root src={TEST_VIDEO_SRC}>
        <ReactVideo.FullScreenContent data-testid={FULL_SCREEN_CONTENT_TEST_ID}>
          <ReactVideo.Video />
        </ReactVideo.FullScreenContent>
        <ReactVideo.FullScreenTrigger />
      </ReactVideo.Root>
    );

    const fullScreenTrigger = screen.getByRole('button');
    const fullScreenContent = screen.getByTestId(FULL_SCREEN_CONTENT_TEST_ID);

    fireEvent.click(fullScreenTrigger);

    expect(document.fullscreenElement).toContainElement(fullScreenContent);
  });

  it('Only the children of FullScreenContent should be rendered when in fullscreen mode.', () => {
    render(
      <>
        <ReactVideo.Root src={TEST_VIDEO_SRC}>
          <ReactVideo.FullScreenContent data-testid={FULL_SCREEN_CONTENT_TEST_ID}>
            <ReactVideo.Video />
            <div data-testid={DATA_TEST_ID_1} />
          </ReactVideo.FullScreenContent>
          <div data-testid={DATA_TEST_ID_2} />
          <ReactVideo.FullScreenTrigger />
        </ReactVideo.Root>
        <div data-testid={DATA_TEST_ID_3} />
      </>
    );

    const fullScreenTrigger = screen.getByRole('button');

    fireEvent.click(fullScreenTrigger);

    const div1 = screen.getByTestId(DATA_TEST_ID_1);
    const div2 = screen.getByTestId(DATA_TEST_ID_2);
    const div3 = screen.getByTestId(DATA_TEST_ID_3);

    expect(document.fullscreenElement).toContainElement(div1);
    expect(document.fullscreenElement).not.toContainElement(div2);
    expect(document.fullscreenElement).not.toContainElement(div3);
  });
});
