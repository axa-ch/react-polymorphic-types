# react-polymorphic-types

[![Build Status][ci-image]][ci-url]
[![MIT License][license-image]][license-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]

About Zero-runtime polymorphic component definitions for React

## Explanation

### What's a React.js polymorphic component?

When creating design systems or reusable UI components in React, you may come across the need for **polymorphic components**.
A polymorphic component is a versatile component that can render different underlying HTML elements or custom components based on a prop.

A React polymorphic component provides flexibility to the consumer, allowing them to specify the desired element or component type to be rendered using a prop.

For example, let's consider a polymorphic heading component:

```tsx
import { createElement, ElementType, PropsWithChildren, ComponentProps } from 'react';

// Define the props for the polymorphic heading component
type HeadingProps<T extends ElementType = 'h1'> = PropsWithChildren<
  {
    as?: T;
  } & ComponentProps<T>
>;

// Define the polymorphic heading component
export function Heading<T extends ElementType = 'h1'>({ as = 'h1', children, ...rest }: HeadingProps<T>) {
  return createElement(as, rest, children);
}
```

In the above example, the `Heading` component can render different heading levels (`h1`, `h2`, `h3`, etc.) based on the `as` prop. By default, it renders as an `h1` element.

You can use the `Heading` component in your application like this:

```tsx
const App = () => (
  <article>
    <Heading>My Main Headline</Heading>
    <Heading as='h2'>A Subtitle</Heading>
    <p>A description</p>
  </article>
);
```

In this case, the same `Heading` component is used to render two different semantic tags, `h1` and `h2`, allowing you to control the heading level and maintain consistency across your application.

Polymorphic components provide an elegant solution for building flexible and reusable UI components in React, enabling you to create a cohesive design system with consistent semantics.

### What kind of problems does this package solve?

The use of the `as` attribute might became really complex in case you want to add constraints to your rendered markup or use 3rd party components.
Declaring the polymorphic types for each component might become a tedious task that you want to abstract somehow.
With `@axa-ch/react-polymorphic-types` you will be able to easily add constraints to your polymorphic react components and avoid redundant type definitions.

Below we provide many recipes to cover many use cases you will probably encounter during your development

## Installation and Usage

Install this typescript types via npm:

```shell
npm i @axa-ch/react-polymorphic-types -D
```

### Polymorphic Components Recipes

The following recipes can be copied and modified to give you a bootstrap for your polymorphic components

<details>
 <summary>Basic Example</summary>

This component is a simple polymorphic heading element. Its size and markup can be independently defined using its props

```tsx
import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { PolymorphicProps } from '@axa-ch/react-polymorphic-types';

// Default HTML element if the "as" prop is not provided
export const HeadingDefaultElement: ElementType = 'h1';
// List of allowed HTML Element that can be passed via "as" prop
export type HeadingAllowedElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

// Component-specific props
export type HeadingOwnProps<T extends HeadingAllowedElements> = ComponentPropsWithoutRef<T> & {
  size?: HeadingSizes;
};

// Extend own props with others inherited from the underlying element type
// Own props take precedence over the inherited ones
export type HeadingProps<T extends HeadingAllowedElements = typeof HeadingDefaultElement> = PolymorphicProps<
  HeadingOwnProps<T>,
  T,
  HeadingAllowedElements
>;

export const Heading = <T extends HeadingAllowedElements>({
  as,
  size,
  className,
  children,
  ...rest
}: HeadingProps<T>) => {
  const element: HeadingAllowedElements = as || HeadingDefaultElement;

  return createElement(
    element,
    {
      ...rest,
      className: `${className} size-${size || 1}`,
    },
    children,
  );
};
```

You can use the `Heading` component in your application like this:

```tsx
const App = () => (
  <article>
    <Heading
      as='h1'
      size={2}
    >
      My Main Headline
    </Heading>
    <Heading
      as='h2'
      size={5}
    >
      A Subtitle
    </Heading>

    {/* The following component will throw a typescript error because 'div's are not allowed here */}
    <Heading
      as='div'
      size={5}
    >
      A Subtitle
    </Heading>
    <p>A description</p>
  </article>
);
```

</details>

<details>
 <summary>Basic Example with Ref</summary>

This example is similar to the above but it allows the use of React refs:

```tsx
import { ComponentPropsWithoutRef, createElement, ElementType, forwardRef } from 'react';
import { PolymorphicProps, PolymorphicForwardedRef } from '@axa-ch/react-polymorphic-types';

// Default HTML element if the "as" prop is not provided
export const HeadingDefaultElement: ElementType = 'h1';
// List of allowed HTML Element that can be passed via "as" prop
export type HeadingAllowedElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

// Component-specific props
export type HeadingOwnProps<T extends HeadingAllowedElements> = ComponentPropsWithoutRef<T> & {
  size?: HeadingSizes;
};

export const Heading = forwardRef(
  <T extends HeadingAllowedElements>(
    { as, size, className, children, ...rest }: PolymorphicProps<HeadingOwnProps<T>, T, HeadingAllowedElements>,
    // notice the use of the PolymorphicForwardedRef type here
    ref: PolymorphicForwardedRef<T>,
  ) => {
    const element: HeadingAllowedElements = as || HeadingDefaultElement;

    return createElement(
      element,
      {
        ...rest,
        ref,
        className: `${className} size-${size || 1}`,
      },
      children,
    );
  },
);
```

Using the `@axa-ch/react-polymorphic-types` types will allow you automatically to infer the proper ref DOM node

```tsx
const App = () => {
  // the use of HTMLHeadingElement type safe
  const ref = useRef<HTMLHeadingElement | null>(null);

  return (
    <Heading
      ref={ref}
      as='h2'
    />
  );
};
```

</details>

<details>
 <summary>Exotic Component Example</summary>

Polymorphic exotic components allow you to use either DOM nodes or custom rendering functions for your HTML

```tsx
import { ComponentPropsWithoutRef, createElement, ElementType, ExoticComponent } from 'react';
import { PolymorphicExoticProps, PolymorphicProps } from '@axa-ch/react-polymorphic-types';

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
```

The above component will work with straight html nodes or with external exotic components like for example the ones provided by [framer-motion](https://www.framer.com/motion/)

```tsx
import { motion } from 'framer-motion';
const App = () => (
  <>
    <Container as={'div'} />
    {/* notice that the exotic props here will be automatically inferred */}
    <Container
      as={motion.article}
      layout
    />
  </>
);
```

</details>

<details>
 <summary>Exotic Component Example with Ref</summary>

Polymorphic exotic component using refs are a bit more complex and require some additional code to work properly:

```tsx
import { ComponentPropsWithoutRef, createElement, ElementType, ExoticComponent, memo } from 'react';
import { PolymorphicProps, PolymorphicForwardedRef } from '@axa-ch/react-polymorphic-types';

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

export const ContainerInner = <T extends ContainerAllowedElements>({
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

// Memo with generics is tricky
// see also https://fettblog.eu/typescript-react-generic-forward-refs/
export const Container = memo(ContainerInner) as <T extends ContainerAllowedElements>(
  // eslint-disable-next-line no-use-before-define
  props: ContainerProps<T>,
) => ReturnType<typeof ContainerInner>;
```

With the above example DOM Nodes will be automatically inferred also using 3rd party exotic rendering functions:

```tsx
import { motion } from 'framer-motion';
const App = () => (
  <>
    <Container as={'div'} />
    {/* notice that the exotic props here will be automatically inferred */}
    <Container
      as={motion.article}
      layout
    />
  </>
);
const App = () => {
  const div = useRef<HTMLDivElement | null>(null);
  // article and other html5 tags are just of type HTMLElement
  const article = useRef<HTMLElement | null>(null);

  return (
    <>
      <Container
        ref={div}
        as={'div'}
      />
      <Container
        ref={article}
        as={motion.article}
        layout
      />
    </>
  );
};
```

</details>

<details>
 <summary>Complex Exotic/Functional Component Example</summary>

This example combines multiple rendering strategies for your component in order allow the maximum flexibility to its consumers:

```tsx
// We need to infer the functional component properties so any in this case is needed
// You can also add strict types for your functional components but it will reduce its flexibility
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
```

Let's see how we can use the above component with all its possible rendering options:

```tsx
import { motion } from 'framer-motion';

type FooProps = ComponentPropsWithoutRef<'div'> & { size: 'small' | 'large'; name: string };

const Foo: FC<FooProps> = ({ className, size = 'large', ...rest }) => (
  <div
    {...rest}
    className={`${className} the-foo ${size}`}
  />
);

const App = () => (
  <>
    <Container as={'div'} />
    <Container
      size={'small'}
      name={'foo'}
      as={Foo}
    />
    <Container
      as={motion.div}
      layout
      animate
    />
  </>
);
```

</details>

## Credits

This project wouldn't exist without [https://github.com/kripod/react-polymorphic-types](react-polymorphic-types)

[ci-image]: https://img.shields.io/github/actions/workflow/status/axa-ch/react-polymorphic-types/ci.yml?style=flat-square&branch=main
[ci-url]: https://github.com/axa-ch/react-polymorphic-types/actions
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: https://img.shields.io/npm/v/@axa-ch/react-polymorphic-types.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/@axa-ch/react-polymorphic-types.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@axa-ch/react-polymorphic-types
