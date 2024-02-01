import { useRef } from 'react';
import { Complex } from './components/complex.ref';

export default () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <Complex
      ref={ref}
      as='div'
    />
  );
};

export const Article = () => {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <Complex
      ref={ref}
      as='article'
    />
  );
};
