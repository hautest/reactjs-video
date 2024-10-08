import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

HTMLMediaElement.prototype.pause = function () {
  Object.defineProperty(this, 'paused', {
    configurable: true,
    enumerable: true,
    get: () => true,
  });
};

HTMLMediaElement.prototype.play = async function () {
  Object.defineProperty(this, 'paused', {
    configurable: true,
    enumerable: true,
    get: () => false,
  });
};

document.exitFullscreen = async function () {
  Object.defineProperty(document, 'fullscreenElement', {
    configurable: true,
    enumerable: true,
    get: () => null,
  });

  const event = new Event('fullscreenchange');
  document.dispatchEvent(event);
};

HTMLDivElement.prototype.requestFullscreen = async function () {
  Object.defineProperty(document, 'fullscreenElement', {
    configurable: true,
    enumerable: true,
    get: () => this,
  });

  const event = new Event('fullscreenchange');
  document.dispatchEvent(event);
};

HTMLVideoElement.prototype.requestPictureInPicture = async function () {
  Object.defineProperty(document, 'pictureInPictureElement', {
    configurable: true,
    enumerable: true,
    get: () => this,
  });

  const event = new Event('enterpictureinpicture');
  this.dispatchEvent(event);

  return this;
};

document.exitPictureInPicture = async function () {
  Object.defineProperty(document, 'pictureInPictureElement', {
    configurable: true,
    enumerable: true,
    get: () => null,
  });

  const event = new Event('leavepictureinpicture');

  const videoElement = document.querySelector('video');

  if (videoElement) {
    videoElement.dispatchEvent(event);
  }
};
