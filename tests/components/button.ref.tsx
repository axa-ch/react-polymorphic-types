import { type ComponentPropsWithoutRef, type ExoticComponent, type FC, createElement, forwardRef } from 'react';
import type {
  PolymorphicExoticProps,
  PolymorphicForwardedRef,
  PolymorphicFunctionalProps,
  PolymorphicProps,
} from '../../index';

// Default HTML element if the "as" prop is not provided
export const ButtonDefaultElement = 'button';
// List of allowed HTML Element that can be passed via "as" prop
export type ButtonAllowedElements = typeof ButtonDefaultElement | 'a' | 'div' | 'span';
// List of allowed React nodes that can be passed along with the "as" prop
// biome-ignore lint/suspicious/noExplicitAny: allow the use of any react FC component
export type ButtonAllowedComponentTypes = ButtonAllowedElements | ExoticComponent | FC<any>;

// Component-specific props
export type ButtonOwnProps<T extends ButtonAllowedElements> = ComponentPropsWithoutRef<T> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
};

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type ButtonProps<T extends ButtonAllowedComponentTypes> = T extends ButtonAllowedElements
  ? PolymorphicProps<ButtonOwnProps<T>, T, ButtonAllowedElements>
  : // biome-ignore lint/suspicious/noExplicitAny: allow the use of any react FC component
    T extends FC<any>
    ? PolymorphicFunctionalProps<ButtonOwnProps<ButtonAllowedElements>, T, ButtonAllowedElements>
    : PolymorphicExoticProps<ButtonOwnProps<ButtonAllowedElements>, T, ButtonAllowedElements>;

const ButtonInner = <T extends ButtonAllowedComponentTypes>(
  { as = ButtonDefaultElement, children, ...rest }: ButtonProps<T>,
  ref: PolymorphicForwardedRef<T>,
) =>
  createElement(
    as,
    {
      ...(rest.disabled && as !== 'button' ? { 'data-disabled': 'disabled' } : null),
      ...rest,
      ref,
    },
    children,
  );

// Forward refs with generics is tricky
// see also https://fettblog.eu/typescript-react-generic-forward-refs/
export const Button = forwardRef<ButtonAllowedComponentTypes>(ButtonInner) as <
  T extends ButtonAllowedComponentTypes = typeof ButtonDefaultElement,
>(
  props: ButtonProps<T> & { ref?: PolymorphicForwardedRef<T> },
) => ReturnType<typeof ButtonInner>;
