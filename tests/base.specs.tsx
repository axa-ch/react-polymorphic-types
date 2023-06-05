import { Heading } from './components/base';

export default () => {
  return (
    <>
      <Heading as='h2' />
      <Heading
        size={2}
        as='h1'
      />
      <Heading
        size={2}
        // @ts-expect-error
        // only heading elements are allowed
        as='span'
      />
      <Heading
        // @ts-expect-error
        // value can not be set on an heading element
        value={3}
        as='h4'
      />
      <Heading
        // @ts-expect-error
        // div elements are not allowed
        as='div'
      />
    </>
  );
};
