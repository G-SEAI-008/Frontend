import { redirect } from 'react-router';
import { z } from 'zod';

import type { AuthActionResult } from '@/types';

import { ApiErrorSchema, AuthResponseSchema } from '../schemas/api';

const API_URL = import.meta.env.VITE_EVENTS_API_URL;

export const loginAction = async ({ request }: { request: Request }): Promise<AuthActionResult> => {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const loginSchema = z.object({
      email: z.email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters long'),
    });
    const { data, error, success } = loginSchema.safeParse({
      email,
      password,
    });
    if (!success) {
      throw new Error(z.prettifyError(error));
    }
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const apiError = ApiErrorSchema.parse(await response.json());
      throw new Error(apiError.error ?? 'Login failed');
    }
    const { user, token } = AuthResponseSchema.parse(await response.json());
    return {
      success: true,
      user,
      token,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: 'Something went very wrong!',
    };
  }
};

export const registerAction = async ({
  request,
}: {
  request: Request;
}): Promise<AuthActionResult> => {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const newUserSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters long'),
    });
    const { data, error, success } = newUserSchema.safeParse({
      name,
      email,
      password,
    });
    if (!success) {
      throw new Error(z.prettifyError(error));
    }
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const apiError = ApiErrorSchema.parse(await response.json());
      throw new Error(apiError.error ?? 'Registration failed');
    }
    return redirect('/login');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: 'Something went very wrong!',
    };
  }
};
