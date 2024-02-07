import { forwardRef, useRef } from 'react';
import { Button } from './components/button.ref';

export default () => {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <Button
      ref={ref}
      as='button'
    />
  );
};

export const ForwardedButton = forwardRef<HTMLButtonElement>(({ ...props }, ref) => (
  <Button
    {...props}
    ref={ref}
    as={'button'}
  />
));
