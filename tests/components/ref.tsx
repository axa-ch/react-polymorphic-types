import { type ComponentPropsWithoutRef, type ElementType, createElement, forwardRef } from 'react';
import type { PolymorphicForwardedRef, PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const HeadingDefaultElement: ElementType = 'h1';
// List of allowed HTML Element that can be passed via "as" prop
export type HeadingAllowedElements =
  | typeof HeadingDefaultElement
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';
export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

// Component-specific props
export type HeadingOwnProps<T extends HeadingAllowedElements> = ComponentPropsWithoutRef<T> & {
  size?: HeadingSizes;
};

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type HeadingProps<T extends HeadingAllowedElements> = PolymorphicProps<
  HeadingOwnProps<T>,
  T,
  HeadingAllowedElements
>;

const HeadingInner = <T extends HeadingAllowedElements>(
  { as = HeadingDefaultElement, size, className, children, ...rest }: HeadingProps<T>,
  ref: PolymorphicForwardedRef<T>,
) =>
  createElement(
    as,
    {
      ...rest,
      ref,
      className: `${className} size-${size || 1}`,
    },
    children,
  );

// Forward refs with generics is tricky
// see also https://fettblog.eu/typescript-react-generic-forward-refs/
export const Heading = forwardRef(HeadingInner) as unknown as <T extends HeadingAllowedElements>(
  props: HeadingProps<T> & { ref?: PolymorphicForwardedRef<T> },
) => ReturnType<typeof HeadingInner>;
