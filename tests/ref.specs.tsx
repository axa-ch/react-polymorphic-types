import { useRef } from 'react';
import { Heading as ForwardedRefHeading } from './components/ref';
import { Heading } from './components/ref-react-19';

export default () => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  return (
    <Heading
      ref={ref}
      as='h1'
    />
  );
};

export const ForwardedRef = () => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  return (
    <ForwardedRefHeading
      ref={ref}
      as='h1'
    />
  );
};
