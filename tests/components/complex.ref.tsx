import { type ComponentPropsWithoutRef, type ElementType, createElement, forwardRef } from 'react';
import type { PolymorphicForwardedRef, PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const ComplexDefaultElement: ElementType = 'div';
// List of allowed HTML Element that can be passed via "as" prop
export type ComplexAllowedElements = 'div' | 'article' | 'section';

// Component-specific props
export type ComplexOwnProps<T extends ComplexAllowedElements> = ComponentPropsWithoutRef<T>;

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type ComplexProps<T extends ComplexAllowedElements> = T extends ComplexAllowedElements
  ? PolymorphicProps<ComplexOwnProps<T>, T, ComplexAllowedElements>
  : never;

const ComplexInner = <T extends ComplexAllowedElements>(
  { as = ComplexDefaultElement, children, ...rest }: ComplexProps<T>,
  ref: PolymorphicForwardedRef<T>,
) =>
  createElement(
    as,
    {
      ...rest,
      ref,
    },
    children,
  );

// Forward refs with generics is tricky
// see also https://fettblog.eu/typescript-react-generic-forward-refs/
export const Complex = forwardRef(ComplexInner) as unknown as <T extends ComplexAllowedElements>(
  props: ComplexProps<T> & { ref?: PolymorphicForwardedRef<T> },
) => ReturnType<typeof ComplexInner>;
