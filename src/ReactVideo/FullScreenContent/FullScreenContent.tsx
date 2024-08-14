import { HTMLAttributes } from 'react';
import { WithAsChild } from '../types/WithAsChild';
import { Slot } from '@radix-ui/react-slot';
import { useReactVideoContext } from '../reactVideoContext';

export type FullScreenContentProps = WithAsChild & HTMLAttributes<HTMLDivElement>;

export const FullScreenContent = ({ asChild, children, ...rest }: FullScreenContentProps) => {
  const Comp = asChild ? Slot : 'div';
  const { fullScreenContentRef } = useReactVideoContext('FullScreenContent');

  return (
    <Comp ref={fullScreenContentRef} {...rest}>
      {children}
    </Comp>
  );
};
