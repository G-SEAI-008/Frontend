// oxlint-disable require-await
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import 'zod/compile'; // ~9x schneller

const RegisterFormSchema = z.object({
  username: z.string().min(1),
  email: z.string().min(1),
  password: z.string().nonempty(), // alias für min(1)
});

// const RegisterFormSchemaCompiled = z.compile(RegisterFormSchema); // ~9x schneller

const registerUser = async (formData: FormData) => {
  const unvalidatedFormdata: unknown = Object.fromEntries(formData);
  const { success, data, error } = RegisterFormSchema.safeParse(unvalidatedFormdata);
  if (!success) {
    throw new Error('All fields are required');
  }
  // Ab hier MUSS success: true sein & data existieren
  const { username, email } = data;
  console.log('User registered:', { username, email });
  // Hier würden wir die Daten in der Datenbank schreiben

  redirect('/login');
};

export { registerUser };
