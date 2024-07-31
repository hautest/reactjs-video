import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useReactVideoContext } from './reactVideoContext';

export interface VolumeChildProps {
  setVolume?: Dispatch<SetStateAction<number | undefined>>;
  volume?: number;
}

export interface VolumeProps {
  children: (props: VolumeChildProps) => ReactNode;
}

export const Volume = ({ children }: VolumeProps) => {
  const { volume, setVolume } = useReactVideoContext('Volume');

  return children({ volume, setVolume });
};
