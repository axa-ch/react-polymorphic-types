import { ComponentPropsWithoutRef, createElement, ElementType, ExoticComponent } from 'react';
import { Merge, PolymorphicPropsWithoutRef } from '../../index';

// Default HTML element if the "as" prop is not provided
export const DefaultElement: ElementType = 'div';

// List of allowed HTML Element that can be passed via "as" prop
export type ContainerAllowedDomNodes = 'div' | 'article' | 'section';
// List of allowed React nodes that can be passed along with the "as" prop
export type ContainerAllowedComponentTypes = ElementType | ExoticComponent;
// Make sure that the basic html attributes will always be received by this component,
// even if an exotic component will be used for the "as" attribute
export type ContainerOwnProps<T extends ContainerAllowedComponentTypes> = T extends ExoticComponent<infer U>
  ? // Exotic components props should be inferred and merged with the ones available on the allowed DOM nodes
    Merge<ComponentPropsWithoutRef<ContainerAllowedDomNodes>, U>
  : ComponentPropsWithoutRef<T>;

export type ContainerProps<T extends ContainerAllowedComponentTypes> = PolymorphicPropsWithoutRef<
  ContainerOwnProps<T>,
  T,
  ContainerAllowedDomNodes
>;

export const Container = <T extends ContainerAllowedComponentTypes>({
  as,
  children,
  className,
  ...rest
}: ContainerProps<T>) => createElement(as || DefaultElement, { ...rest, className }, children);
