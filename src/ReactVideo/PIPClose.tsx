import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';

export type PIPCloseProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const PIPClose = ({ asChild, onClick, ...rest }: PIPCloseProps) => {
  const Comp = asChild ? Slot : 'button';
  const { isPIP } = useReactVideoContext('PIPClose');

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    }
    onClick?.(e);
  };

  return isPIP && <Comp {...rest} onClick={handleClick} />;
};
