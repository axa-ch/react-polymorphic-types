import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef, FC } from 'react';
import { Container } from './components/functional';
import { Heading } from './components/ref';

type FooProps = ComponentPropsWithoutRef<'div'> & { size: 'small' | 'large'; name: string };

const Foo: FC<FooProps> = ({ className, size = 'large', ...rest }) => (
  <div
    {...rest}
    className={`${className} the-foo ${size}`}
  />
);

export default () => {
  return (
    <>
      <Container as={'div'} />
      <Container
        // @ts-expect-error
        // input elements are not allowed
        as={'input'}
      />
      <Container
        as={'article'}
        // @ts-expect-error
        // the article element has not layout intrinsic attribute
        layout
      />
      {/* the name property is missing */}
      {/* @ts-expect-error */}
      <Container
        size={'small'}
        as={Foo}
      />
      <Container
        size={'small'}
        name={'foo'}
        as={Foo}
      />
      {/* Handle deep and possibly infinite instantiations */}
      <Container
        as={Heading}
        size={'small'}
      />
      <Container
        as={motion.div}
        layout
        animate
      />
    </>
  );
};
