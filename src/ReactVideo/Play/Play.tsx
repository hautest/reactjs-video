import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { useReactVideoContext } from '../reactVideoContext';
import { WithAsChild } from '../types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';

export type PlayProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const Play = ({ asChild, onClick, ...rest }: PlayProps) => {
  const Comp = asChild ? Slot : 'button';
  const { setPlay, play } = useReactVideoContext('Play');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPlay?.(true);
    onClick?.(e);
  };

  return !play && <Comp onClick={handleClick} {...rest} />;
};
