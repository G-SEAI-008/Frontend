// oxlint-disable require-await
'use server';

import { z } from 'zod';

const LoginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type LoginState = {
  success: boolean;
  error: string | null;
  message?: string;
};

const loginUser = async (
  _previousStegosaurus: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  // oxlint-disable-next-line promise/avoid-new no-promise-executor-return typescript/strict-void-return
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { success, data, error } = LoginFormSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return { error: 'All fields are required', success: false };
  }

  if (data.password !== '123456') {
    return { error: 'Invalid credentials', success: false };
  }

  console.log('User logged in:', { email: data.email });

  return {
    success: true,
    error: null,
    message: 'Logged in successfully',
  };
};

export { loginUser };
