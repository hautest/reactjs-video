import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useReactVideoContext } from './reactVideoContext';

export interface CurrentTimeChildProps {
  setCurrentTime?: Dispatch<SetStateAction<number | undefined>>;
  currentTime?: number;
}

export interface CurrentTimeProps {
  children: (props: CurrentTimeChildProps) => ReactNode;
}

export const CurrentTime = ({ children }: CurrentTimeProps) => {
  const { currentTime, setCurrentTime } = useReactVideoContext('CurrentTime');

  return children({ currentTime, setCurrentTime });
};
CurrentTime.displayName = 'CurrentTime';
