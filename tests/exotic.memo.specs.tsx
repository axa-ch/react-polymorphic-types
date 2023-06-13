import { motion } from 'framer-motion';
import { Container } from './components/exotic.memo';

export default () => {
  return <Container as='div' />;
};

export const Exotic = () => {
  return (
    <Container
      as={motion.article}
      layout
    />
  );
};
