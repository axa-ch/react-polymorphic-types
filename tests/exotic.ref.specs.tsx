import { useRef } from 'react';
import { Container } from './components/exotic.ref';

export default () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <Container
      ref={ref}
      as='div'
    />
  );
};
