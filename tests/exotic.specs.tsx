import { motion } from 'framer-motion';
import { Container } from './components/exotic';

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

      <Container
        as={'article'}
        // @ts-expect-error
        // input attributes are not allowed
        min={3}
      />

      <Container
        as={motion.div}
        layout
        animate
      />

      <Container
        as={motion.input}
        layout
      />
      <Container
        as={motion.article}
        layout
      />
    </>
  );
};
