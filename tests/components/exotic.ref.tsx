import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ExoticComponent,
  createElement,
  forwardRef,
} from 'react';
import type { PolymorphicExoticProps, PolymorphicForwardedRef, PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const ContainerDefaultElement: ElementType = 'div';
// List of allowed HTML Element that can be passed via "as" prop
export type ContainerAllowedDOMElements = 'div' | 'article' | 'section';
export type ContainerAllowedElements = ContainerAllowedDOMElements | ExoticComponent;

// Component-specific props
export type ContainerOwnProps<T extends ContainerAllowedDOMElements> = ComponentPropsWithoutRef<T>;

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type ContainerProps<T extends ContainerAllowedElements> = T extends ContainerAllowedDOMElements
  ? PolymorphicProps<ContainerOwnProps<T>, T, ContainerAllowedDOMElements>
  : PolymorphicExoticProps<ContainerOwnProps<ContainerAllowedDOMElements>, T, ContainerAllowedDOMElements>;

// Forwarded ref component
const ContainerInner = <T extends ContainerAllowedElements>(
  { as = ContainerDefaultElement, className, children, ...rest }: ContainerProps<T>,
  ref: PolymorphicForwardedRef<T>,
) =>
  createElement(
    as,
    {
      ...rest,
      ref,
      className,
    },
    children,
  );

// Forward refs with generics is tricky
// see also https://fettblog.eu/typescript-react-generic-forward-refs/
export const Container = forwardRef<ContainerAllowedElements>(ContainerInner) as <T extends ContainerAllowedElements>(
  props: ContainerProps<T> & { ref?: PolymorphicForwardedRef<T> },
) => ReturnType<typeof ContainerInner>;
