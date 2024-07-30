import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

HTMLMediaElement.prototype.pause = vi.fn;
HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
