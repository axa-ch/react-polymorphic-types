// We need to infer the functional component properties so any in this case is needed
import { type ComponentPropsWithoutRef, type ElementType, type ExoticComponent, type FC, createElement } from 'react';
import type { PolymorphicExoticProps, PolymorphicFunctionalProps, PolymorphicProps } from '../../index';

// Default HTML element if the "as" prop is not provided
export const ContainerDefaultElement: ElementType = 'div';
// List of allowed HTML Element that can be passed via "as" prop
export type ContainerAllowedDOMElements = 'div' | 'article' | 'section';
export type ContainerAllowedElements =
  | ContainerAllowedDOMElements
  | ExoticComponent // biome-ignore lint/suspicious/noExplicitAny: allow the use of any react FC component
  | FC<any>;

// Component-specific props
export type ContainerOwnProps<T extends ContainerAllowedElements> = ComponentPropsWithoutRef<T> & {
  size?: 'small' | 'large';
};

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type ContainerProps<T extends ContainerAllowedElements> = T extends ContainerAllowedDOMElements
  ? PolymorphicProps<ContainerOwnProps<T>, T, ContainerAllowedDOMElements>
  : // biome-ignore lint/suspicious/noExplicitAny: allow the use of any react FC component
    T extends FC<any>
    ? PolymorphicFunctionalProps<ContainerOwnProps<ContainerAllowedDOMElements>, T, ContainerAllowedDOMElements>
    : PolymorphicExoticProps<ContainerOwnProps<ContainerAllowedDOMElements>, T, ContainerAllowedDOMElements>;

// debugger method to guarantee that the component props are inferred correctly
const createClassName = (className: string, size: string) => `${className}-${size}`;

export const Container = <T extends ContainerAllowedElements>({
  as = ContainerDefaultElement,
  className,
  size,
  children,
  ...rest
}: ContainerProps<T>) =>
  createElement(
    as,
    {
      ...rest,
      className: createClassName(
        // @ts-expect-error
        // detect the type of the className prop and recognize that it might be undefined
        // notice that <=1.2.5 this would have not been an error
        className satisfies string,
        // @ts-expect-error
        // detect the type of the className prop and recognize that it might be undefined
        // notice that <=1.2.5 this would have not been an error
        size satisfies string,
      ),
    },
    children,
  );
