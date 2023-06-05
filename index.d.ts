// Forked from https://github.com/kripod/react-polymorphic-types/blob/604f8346a821bb6c13268d298762905823c8fba2/index.d.ts

import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithoutRef,
  PropsWithRef,
  JSX,
  ExoticComponent,
  ForwardRefExoticComponent,
} from 'react';

type Merge<T, U> = Omit<T, keyof U> & U;

export type PropsWithAs<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = P & {
  as?: T extends keyof JSX.IntrinsicElements ? (T extends S ? T : never) : T;
};

export type PolymorphicPropsWithoutRef<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<
  T extends keyof JSX.IntrinsicElements ? PropsWithoutRef<JSX.IntrinsicElements[T]> : ComponentPropsWithoutRef<T>,
  PropsWithAs<P, T, S>
>;

export type PolymorphicPropsWithRef<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<
  T extends keyof JSX.IntrinsicElements ? PropsWithRef<JSX.IntrinsicElements[T]> : ComponentPropsWithRef<T>,
  PropsWithAs<P, T, S>
>;

type PolymorphicExoticComponent<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = T extends ExoticComponent<infer U> ? PolymorphicPropsWithoutRef<Merge<P, U>, T, S> : never;

export type PolymorphicForwardRefExoticComponent<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<ForwardRefExoticComponent<P>, PolymorphicExoticComponent<P, T, S>>;
