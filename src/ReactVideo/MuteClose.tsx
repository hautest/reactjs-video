import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';

export type MutedCloseProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const MutedClose = forwardRef<HTMLButtonElement, MutedCloseProps>(({ asChild, onClick, ...rest }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { videoRef, muted, setMuted } = useReactVideoContext('MutedClose');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (videoRef?.current) {
      videoRef.current.muted = false;
      setMuted?.(false);
    }
    onClick?.(e);
  };

  return muted && <Comp {...rest} onClick={handleClick} ref={ref} />;
});
MutedClose.displayName = 'MutedClose';
