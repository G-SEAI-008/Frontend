import { PostSchema } from '../schemas/post';

const getPost = async (id: number) => {
  console.log(`Lade Beitrag mit ID: ${id}`);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!response.ok) {
    throw new Error(`Netzwerkfehler: ${response.status} ${response.statusText}`);
  }

  return PostSchema.parse(await response.json());
};

export { getPost };
