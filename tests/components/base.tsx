import { type ComponentPropsWithoutRef, type ElementType, createElement } from 'react';
import type { PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const HeadingDefaultElement: ElementType = 'h1';
// List of allowed HTML Element that can be passed via "as" prop
export type HeadingAllowedElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

// Component-specific props
export type HeadingOwnProps<T extends HeadingAllowedElements> = ComponentPropsWithoutRef<T> & {
  size?: HeadingSizes;
};

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type HeadingProps<T extends HeadingAllowedElements = typeof HeadingDefaultElement> = PolymorphicProps<
  HeadingOwnProps<T>,
  T,
  HeadingAllowedElements
>;

export const Heading = <T extends HeadingAllowedElements>({
  as = HeadingDefaultElement,
  size,
  className,
  children,
  ...rest
}: HeadingProps<T>) =>
  createElement(
    as,
    {
      ...rest,
      className: `${className} size-${size || 1}`,
    },
    children,
  );
