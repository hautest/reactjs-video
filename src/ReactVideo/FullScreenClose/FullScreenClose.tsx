import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { WithAsChild } from '../types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from '../reactVideoContext';

export type FullScreenCloseProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const FullScreenClose = ({ asChild, onClick, ...rest }: FullScreenCloseProps) => {
  const Comp = asChild ? Slot : 'button';
  const { isFullScreen } = useReactVideoContext('FullScreenClose');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    onClick?.(e);
  };

  return isFullScreen && <Comp {...rest} onClick={handleClick} />;
};
