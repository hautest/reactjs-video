import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { useReactVideoContext } from './reactVideoContext';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';

export type PlayProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const Play = forwardRef<HTMLButtonElement, PlayProps>(({ asChild, onClick, ...rest }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { setPlay } = useReactVideoContext('Play');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPlay?.(true);
    onClick?.(e);
  };

  return <Comp onClick={handleClick} ref={ref} {...rest} />;
});
Play.displayName = 'Play';
