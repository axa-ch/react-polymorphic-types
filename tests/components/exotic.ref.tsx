import { ComponentPropsWithoutRef, createElement, ElementType, ExoticComponent, ForwardedRef, forwardRef } from 'react';
import { PolymorphicExoticProps, PolymorphicProps } from '../../index';

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

export const Container = forwardRef<ContainerAllowedElements>(
  <T extends ContainerAllowedElements>(
    { as, className, children, ...rest }: ContainerProps<T>,
    ref: T extends ContainerAllowedDOMElements ? ForwardedRef<HTMLElementTagNameMap[T]> : ForwardedRef<T>,
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
  },
);
