import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';

export type MutedTriggerProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const MutedTrigger = forwardRef<HTMLButtonElement, MutedTriggerProps>(({ asChild, onClick, ...rest }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { videoRef, muted, setMuted } = useReactVideoContext('MutedTrigger');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (videoRef?.current) {
      videoRef.current.muted = true;
      setMuted?.(true);
    }
    onClick?.(e);
  };

  return !muted && <Comp {...rest} onClick={handleClick} ref={ref} />;
});
MutedTrigger.displayName = 'MutedTrigger';
