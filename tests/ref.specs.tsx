import { useRef } from 'react';
import { Heading } from './components/ref';

export default () => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  return (
    <Heading
      ref={ref}
      as='h2'
    />
  );
};
