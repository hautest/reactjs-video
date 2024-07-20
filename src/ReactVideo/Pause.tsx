import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { useReactVideoContext } from './reactVideoContext';
import { Slot } from '@radix-ui/react-slot';

export type PauseProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const Pause = forwardRef<HTMLButtonElement, PauseProps>(({ asChild, onClick, ...rest }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { setIsPlaying, videoRef } = useReactVideoContext('Pause');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    videoRef.current?.pause();
    setIsPlaying(false);
    onClick?.(e);
  };

  return <Comp onClick={handleClick} ref={ref} {...rest} />;
});
Pause.displayName = 'Pause';
