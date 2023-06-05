// Forked from https://github.com/kripod/react-polymorphic-types/blob/604f8346a821bb6c13268d298762905823c8fba2/index.d.ts

import { ComponentPropsWithoutRef, ElementType, PropsWithoutRef, JSX, ExoticComponent } from 'react';

type Merge<T, U> = Omit<T, keyof U> & U;

export type PropsWithAs<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = P & {
  as?: T extends keyof JSX.IntrinsicElements ? (T extends S ? T : never) : T;
};

export type PolymorphicProps<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<
  T extends keyof JSX.IntrinsicElements ? PropsWithoutRef<JSX.IntrinsicElements[T]> : ComponentPropsWithoutRef<T>,
  PropsWithAs<P, T, S>
>;

type PolymorphicExoticProps<
  P,
  T extends ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = T extends ExoticComponent<infer U> ? PolymorphicProps<Merge<P, U>, T, S> : never;
