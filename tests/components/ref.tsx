import { ComponentPropsWithoutRef, createElement, ElementType, ForwardedRef, forwardRef } from 'react';
import { PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const HeadingDefaultElement: ElementType = 'h1';
// List of allowed HTML Element that can be passed via "as" prop
export type HeadingAllowedElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

// Component-specific props
export type HeadingOwnProps<T extends HeadingAllowedElements> = ComponentPropsWithoutRef<T> & {
  size?: HeadingSizes;
};

export const Heading = forwardRef(
  <T extends HeadingAllowedElements>(
    { as, size, className, children, ...rest }: PolymorphicProps<HeadingOwnProps<T>, T, HeadingAllowedElements>,
    ref: ForwardedRef<HTMLElementTagNameMap[T]>,
  ) => {
    const element: HeadingAllowedElements = as || HeadingDefaultElement;

    return createElement(
      element,
      {
        ...rest,
        ref,
        className: `${className} size-${size || 1}`,
      },
      children,
    );
  },
);
