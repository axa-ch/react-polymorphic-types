// We need to infer the functional component properties so any in this case is needed
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, createElement, ElementType, ExoticComponent, FC } from 'react';
import { PolymorphicFunctionalProps, PolymorphicExoticProps, PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const ContainerDefaultElement: ElementType = 'div';
// List of allowed HTML Element that can be passed via "as" prop
export type ContainerAllowedDOMElements = 'div' | 'article' | 'section';
export type ContainerAllowedElements = ContainerAllowedDOMElements | ExoticComponent | FC<any>;

// Component-specific props
export type ContainerOwnProps<T extends ContainerAllowedDOMElements> = ComponentPropsWithoutRef<T>;

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type ContainerProps<T extends ContainerAllowedElements> = T extends ContainerAllowedDOMElements
  ? PolymorphicProps<ContainerOwnProps<T>, T, ContainerAllowedDOMElements>
  : T extends FC<any>
    ? PolymorphicFunctionalProps<ContainerOwnProps<ContainerAllowedDOMElements>, T, ContainerAllowedDOMElements>
    : PolymorphicExoticProps<ContainerOwnProps<ContainerAllowedDOMElements>, T, ContainerAllowedDOMElements>;

export const Container = <T extends ContainerAllowedElements>({
  as,
  className,
  children,
  ...rest
}: ContainerProps<T>) => {
  const element: ContainerAllowedElements = as || ContainerDefaultElement;

  return createElement(
    element,
    {
      ...rest,
      className,
    },
    children,
  );
};
