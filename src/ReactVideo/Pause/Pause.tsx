import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { WithAsChild } from '../types/WithAsChild';
import { useReactVideoContext } from '../reactVideoContext';
import { Slot } from '@radix-ui/react-slot';

export type PauseProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const Pause = ({ asChild, onClick, ...rest }: PauseProps) => {
  const Comp = asChild ? Slot : 'button';
  const { setPlay, play } = useReactVideoContext('Pause');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPlay?.(false);
    onClick?.(e);
  };

  return play && <Comp onClick={handleClick} {...rest} />;
};
