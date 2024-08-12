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
};

HTMLDivElement.prototype.requestFullscreen = async function () {
  Object.defineProperty(document, 'fullscreenElement', {
    configurable: true,
    enumerable: true,
    get: () => this,
  });
};
