import { z } from 'zod';

export const AuthUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
});

export const AuthResponseSchema = z.object({
  user: AuthUserSchema,
  token: z.string(),
});

export const ApiErrorSchema = z.object({
  error: z.string().optional(),
  message: z.string().optional(),
});

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  organizerId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const EventsResponseSchema = z.object({
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  results: z.array(EventSchema),
});

export const CountResponseSchema = z.object({ totalCount: z.number() });
