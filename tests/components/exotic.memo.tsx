import { ComponentPropsWithoutRef, createElement, ElementType, ExoticComponent, memo } from 'react';
import { PolymorphicExoticProps, PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const ContainerDefaultElement: ElementType = 'div';
// List of allowed HTML Element that can be passed via "as" prop
export type ContainerAllowedDOMElements = typeof ContainerDefaultElement | 'article' | 'section';
export type ContainerAllowedElements = ContainerAllowedDOMElements | ExoticComponent;

// Component-specific props
export type ContainerOwnProps<T extends ContainerAllowedDOMElements> = ComponentPropsWithoutRef<T>;

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type ContainerProps<T extends ContainerAllowedElements> = T extends ContainerAllowedDOMElements
  ? PolymorphicProps<ContainerOwnProps<T>, T, ContainerAllowedDOMElements>
  : PolymorphicExoticProps<ContainerOwnProps<ContainerAllowedDOMElements>, T, ContainerAllowedDOMElements>;

export const ContainerInner = <T extends ContainerAllowedElements>({
  as = ContainerDefaultElement,
  className,
  children,
  ...rest
}: ContainerProps<T>) =>
  createElement(
    as,
    {
      ...rest,
      className,
    },
    children,
  );

// Memo with generics is tricky
// see also https://fettblog.eu/typescript-react-generic-forward-refs/
export const Container = memo<ContainerOwnProps<ContainerAllowedDOMElements>>(ContainerInner) as <
  T extends ContainerAllowedElements,
>(
  // eslint-disable-next-line no-use-before-define
  props: ContainerProps<T>,
) => ReturnType<typeof ContainerInner>;
