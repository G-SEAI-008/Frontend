'use server';

import { notFound } from 'next/navigation';
import { z } from 'zod';

import type { Product } from '@/components/product';
import { ProductSchema } from '@/components/product';

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

type Post = z.infer<typeof PostSchema>;

const CommentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

type Comment = z.infer<typeof CommentSchema>;

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to load posts');
  }
  const data: unknown = await response.json();
  return PostSchema.array().parse(data);
};

const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load product');
  }
  const data: unknown = await res.json();
  return ProductSchema.parse(data);
};

const fetchRelated = async (category: string): Promise<Product[]> => {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
    { cache: 'no-store' },
  );
  if (!res.ok) {
    throw new Error('Failed to load related products');
  }
  const data: unknown = await res.json();
  return ProductSchema.array().parse(data);
};

const fetchPost = async (id: string): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store',
  });
  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error('Failed to load post');
  }
  const data: unknown = await response.json();
  return PostSchema.parse(data);
};

const fetchComments = async (id: string): Promise<Comment[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to load comments');
  }
  const data: unknown = await response.json();
  return CommentSchema.array().parse(data);
};

export { fetchPosts, fetchProduct, fetchRelated, fetchPost, fetchComments };
export type { Post, Comment };
