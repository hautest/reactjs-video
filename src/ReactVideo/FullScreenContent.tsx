import { forwardRef, HTMLAttributes, useEffect } from 'react';
import { WithAsChild } from './types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from './reactVideoContext';
import { composeRefs } from '../utils/composeRefs';

export type FullScreenContentProps = WithAsChild & HTMLAttributes<HTMLDivElement>;

export const FullScreenContent = forwardRef<HTMLDivElement, FullScreenContentProps>(
  ({ asChild, children, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const { fullScreenContentRef, setIsFullScreen } = useReactVideoContext('FullScreenContent');

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullScreen?.(document.fullscreenElement !== null);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
      };
    }, [setIsFullScreen]);

    return (
      <Comp ref={composeRefs(fullScreenContentRef, ref)} {...rest}>
        {children}
      </Comp>
    );
  }
);
FullScreenContent.displayName = 'FullScreenContent';