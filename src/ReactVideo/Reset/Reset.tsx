import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { WithAsChild } from '../types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from '../reactVideoContext';

export interface ResetProps extends WithAsChild, ButtonHTMLAttributes<HTMLButtonElement> {
  remainPlayState?: boolean;
}

export const Reset = ({ asChild, onClick, remainPlayState = true, ...rest }: ResetProps) => {
  const Comp = asChild ? Slot : 'button';
  const { videoRef, onReset, setCurrentTime, setPlay } = useReactVideoContext('Reset');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (videoRef?.current) {
      setCurrentTime?.(0);
      onReset?.();
    }
    if (!remainPlayState) {
      setPlay?.(prev => !prev);
    }
    onClick?.(e);
  };

  return <Comp {...rest} onClick={handleClick} />;
};
