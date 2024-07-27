import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { useReactVideoContext } from './reactVideoContext';
import { Slot } from '@radix-ui/react-slot';

export type PauseProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const Pause = forwardRef<HTMLButtonElement, PauseProps>(({ asChild, onClick, ...rest }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { setPlay, play } = useReactVideoContext('Pause');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPlay?.(false);
    onClick?.(e);
  };

  return play && <Comp onClick={handleClick} ref={ref} {...rest} />;
});
Pause.displayName = 'Pause';
