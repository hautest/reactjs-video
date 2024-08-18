import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useReactVideoContext } from '../reactVideoContext';

export interface CurrentTimeChildProps {
  setCurrentTime?: Dispatch<SetStateAction<number | undefined>>;
  currentTime?: number;
  buffered: number;
  duration?: number;
}

export interface CurrentTimeProps {
  children: (props: CurrentTimeChildProps) => ReactNode;
}

export const CurrentTime = ({ children }: CurrentTimeProps) => {
  const { currentTime, setCurrentTime, videoRef } = useReactVideoContext('CurrentTime');
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    const video = videoRef?.current;
    if (video) {
      const updateBufferedEnd = () => {
        const buffered = video.buffered;
        if (buffered.length > 0) {
          const end = buffered.end(buffered.length - 1);
          setBuffered(end);
        }
      };

      video.addEventListener('progress', updateBufferedEnd);

      return () => {
        video.removeEventListener('progress', updateBufferedEnd);
      };
    }
  }, [videoRef]);

  return children({ currentTime, setCurrentTime, buffered, duration: videoRef?.current?.duration });
};
