import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { WithAsChild } from '../types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from '../reactVideoContext';

export type MutedCloseProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const MutedClose = ({ asChild, onClick, ...rest }: MutedCloseProps) => {
  const Comp = asChild ? Slot : 'button';
  const { videoRef, muted, setMuted } = useReactVideoContext('MutedClose');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (videoRef?.current) {
      videoRef.current.muted = false;
      setMuted?.(false);
    }
    onClick?.(e);
  };

  return muted && <Comp {...rest} onClick={handleClick} />;
};
