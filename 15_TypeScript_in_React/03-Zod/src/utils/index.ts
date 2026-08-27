import z from 'zod';

// type ErrorFields = {
//   name: string;
//   email: string;
//   message: string;
// };

// const validate = ({ name, email, message }: ErrorFields) => {
//   const newErrors: Partial<ErrorFields> = {};
//   if (!name.trim()) {
//     newErrors.name = 'Name is required.';
//   }
//   if (!email.trim()) {
//     newErrors.email = 'Email is required.';
//   } else if (!/\S+@\S+\.\S+/u.test(email)) {
//     newErrors.email = 'Invalid email format.';
//   }
//   if (!message.trim()) {
//     newErrors.message = 'Message is required.';
//   }
//   return newErrors;
// };

// oxlint-disable-next-line promise/avoid-new no-promise-executor-return typescript/strict-void-return promise/param-names
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: 'Name is required.' })
    .max(64, { error: 'Name too long' }),
  number: z
    .string()
    .trim()
    .min(1, { error: 'Number required' })
    .pipe(z.coerce.number({ error: 'Invalid number' })), // Number(input))
  email: z
    .string()
    .trim()
    .min(1, { error: 'Email is required.' })
    .pipe(z.email({ error: 'Invalid email format.' })),
  message: z
    .string()
    .trim()
    .min(1, { error: 'Message required' })
    .max(2000, { error: 'Message too long' }),
});

// const OptionalFormSchema = FormSchema.partial();

type FormType = z.infer<typeof FormSchema>;

export { sleep, FormSchema, type FormType };
