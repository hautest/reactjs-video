import { RefObject } from 'react';
import { createContext } from '../utils/createContext';
import { ReactVideoState } from './types/ReactVideoState';

export interface ReactVideoContext extends ReactVideoState {
  videoRef: RefObject<HTMLVideoElement>;
  autoPlay?: boolean;
}

export const [ReactVideoProvider, useReactVideoContext] = createContext<Partial<ReactVideoContext>>('ReactVideo');
