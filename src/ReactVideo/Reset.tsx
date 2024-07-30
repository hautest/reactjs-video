import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';

export type ResetProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const Reset = forwardRef<HTMLButtonElement, ResetProps>(({ asChild, onClick, ...rest }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { videoRef, onReset } = useReactVideoContext('Reset');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = 0;
      onReset?.();
    }
    onClick?.(e);
  };

  return <Comp {...rest} ref={ref} onClick={handleClick} />;
});
Reset.displayName = 'Reset';
