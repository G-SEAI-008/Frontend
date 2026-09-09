type LoadingProps = {
  message: string;
};

export default function Loading({ message }: LoadingProps) {
  return (
    <output className='loading'>
      <span className='spinner' aria-hidden='true' />
      <p>{message}</p>
    </output>
  );
}
