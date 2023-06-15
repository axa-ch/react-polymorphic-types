import { useRef } from 'react';
import { Heading } from './components/ref';

export default () => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <Heading
      ref={ref}
      as='a'
    />
  );
};
