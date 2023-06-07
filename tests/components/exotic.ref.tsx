import { ComponentPropsWithoutRef, createElement, ElementType, ExoticComponent, forwardRef } from 'react';
import { PolymorphicExoticProps, PolymorphicForwardedRef, PolymorphicProps } from '../../index';

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
  { as, className, children, ...rest }: ContainerProps<T>,
  ref: PolymorphicForwardedRef<T>,
) => {
  const element: ContainerAllowedElements = as || ContainerDefaultElement;

  return createElement(
    element,
    {
      ...rest,
      ref,
      className,
    },
    children,
  );
};

// Forward refs with generics are tricky
// see also https://fettblog.eu/typescript-react-generic-forward-refs/
export const Container = forwardRef<ContainerAllowedElements>(ContainerInner) as <T extends ContainerAllowedElements>(
  // eslint-disable-next-line no-use-before-define
  props: ContainerProps<T> & { ref?: PolymorphicForwardedRef<T> },
) => ReturnType<typeof ContainerInner>;
