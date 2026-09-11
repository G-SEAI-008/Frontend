import { queryOptions } from '@tanstack/react-query';

import { fetchJSON } from './api';
import { PostSchema, PostsSchema } from './postSchema';

const postsQueryOptions = (limit = 10) =>
  queryOptions({
    queryKey: ['posts', 'list', { limit }],
    // staleTime: 30_000,
    queryFn: async ({ signal }) => {
      const data = await fetchJSON(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`, {
        signal,
      });
      return PostsSchema.parse(data);
    },
  });

const postQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: ['posts', 'detail', postId],
    queryFn: async ({ signal }) => {
      const data = await fetchJSON(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        signal,
      });
      return PostSchema.parse(data);
    },
  });

export { postsQueryOptions, postQueryOptions };
