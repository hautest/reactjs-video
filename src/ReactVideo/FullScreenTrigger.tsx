import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';

export type FullScreenTriggerProps = WithAsChild & ButtonHTMLAttributes<HTMLButtonElement>;

export const FullScreenTrigger = forwardRef<HTMLButtonElement, FullScreenTriggerProps>(
  ({ asChild, onClick, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const { fullScreenContentRef, isFullScreen } = useReactVideoContext('FullScreenTrigger');

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      fullScreenContentRef?.current?.requestFullscreen();
      onClick?.(e);
    };

    return !isFullScreen && <Comp {...rest} onClick={handleClick} ref={ref} />;
  }
);
FullScreenTrigger.displayName = 'FullScreenTrigger';
