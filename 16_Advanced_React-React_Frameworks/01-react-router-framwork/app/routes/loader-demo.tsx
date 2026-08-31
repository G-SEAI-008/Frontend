import type { Route } from './+types/loader-demo';

// oxlint-disable typescript/require-await
const loader = async () => {
  return { name: 'Alice', age: 25 };
};

const LoaderDemo = ({ loaderData }: Route.ComponentProps) => {
  console.log(loaderData);
  return (
    <div>
      <h2>Loader Demo</h2>
      <p>Name: {loaderData.name}</p>
      <p>Age: {loaderData.age}</p>
    </div>
  );
};

export default LoaderDemo;
export { loader };
