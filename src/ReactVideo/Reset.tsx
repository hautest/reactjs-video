import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';

export type ResetProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const Reset = ({ asChild, onClick, ...rest }: ResetProps) => {
  const Comp = asChild ? Slot : 'button';
  const { videoRef, onReset, setCurrentTime } = useReactVideoContext('Reset');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (videoRef?.current) {
      setCurrentTime?.(0);
      onReset?.();
    }
    onClick?.(e);
  };

  return <Comp {...rest} onClick={handleClick} />;
};
