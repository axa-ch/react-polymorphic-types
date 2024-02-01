import { useRef } from 'react';
import { Heading } from './components/ref';

export default () => {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <Heading
      ref={ref}
      as='h1'
    />
  );
};
