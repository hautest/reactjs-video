import { Dispatch, SetStateAction } from 'react';
import { createContext } from '../utils/createContext';

export interface ReactVideoContext {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export const [ReactVideoProvider, useReactVideoContext] = createContext<ReactVideoContext>('ReactVideo');
