import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';

export type PIPTriggerProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const PIPTrigger = forwardRef<HTMLButtonElement, PIPTriggerProps>(({ asChild, onClick, ...rest }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { isPIP, videoRef } = useReactVideoContext('PIPTrigger');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    videoRef?.current?.requestPictureInPicture();
    onClick?.(e);
  };

  return !isPIP && <Comp {...rest} onClick={handleClick} ref={ref} />;
});
PIPTrigger.displayName = 'PIPTrigger';
