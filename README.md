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

### What kind of problem does this problem solve?

The use of the `as` attribute might became really complex in case you want to add constraints to your rendered markup or use 3rd party components
With the typescript types exported by this project

## Installation and Usage

Install this typescript types via npm:

```shell
npm i @axa-ch/react-polymorphic-types -D
```

## Credits

This project wouldn't exist without [https://github.com/kripod/react-polymorphic-types](@kripod's react-polymorphic-types)

[ci-image]: https://img.shields.io/github/actions/workflow/status/axa-ch/react-polymorphic-types/ci.yml?style=flat-square&branch=main
[ci-url]: https://github.com/axa-ch/react-polymorphic-types/actions
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: https://img.shields.io/npm/v/@axa-ch/react-polymorphic-types.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/@axa-ch/react-polymorphic-types.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@axa-ch/react-polymorphic-types
