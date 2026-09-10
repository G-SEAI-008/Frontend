'use server';

import { notFound } from 'next/navigation';

import { PostSchema, PostsSchema } from './schemas';

// Jede Funktion: fetch → response.ok prüfen → response.json() → Schema.parse(data).
// Die Schemas findest du in schemas.ts.

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Die Posts konnten nicht geladen werden.');
  }

  const data: unknown = await response.json();
  return PostsSchema.parse(data);
};

const getPost = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${encodeURIComponent(id)}`,
    { cache: 'no-store' },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error('Der Post konnte nicht geladen werden.');
  }

  const data: unknown = await response.json();
  return PostSchema.parse(data);
};

export { getPosts, getPost };
