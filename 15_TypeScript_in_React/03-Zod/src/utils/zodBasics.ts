// import * as z from 'zod';
// import { z } from 'zod';
import z from 'zod';

// const myMessage = 'Hallo, Leute!';
// // myMessage = 123_456;

// const MessageSchema = z.string().min(12).max(512);

// // const parsedMessage = MessageSchema.parse(myMessage);
// const safeParsedMessage = MessageSchema.safeParse(myMessage);

// // if (safeParsedMessage.success) {
// //   console.log(safeParsedMessage.data);
// // } else {
// //   console.log(safeParsedMessage.error);
// // }

// console.log(safeParsedMessage);

const user = {
  id: 123,
  name: 'Guybrush',
  username: 'mightypirate',
  //   email: 'mighty@pirate.gov',
  age: 32,
  password: '123',
  address: {
    street: 'Melee Island 1',
    geo: [52, 13],
  },
};

const NameSchema = z
  .string()
  .nonempty({ error: 'Name required' })
  .max(128, { error: 'Name too long' });

const basePasswordSchema = z
  .string({
    error: 'Password must be a string',
  })
  .min(12, { error: 'Password must be at least 12 characters long' })
  .max(50, { error: 'The length of this Password is excessive.' });

// const UserSchema = z.strictObject({
const UserSchema = z.object({
  id: z.number(),
  name: NameSchema,
  username: NameSchema,
  email: z.email().optional(),
  age: z.number().positive({ error: 'Age must be positive' }).max(120, { error: 'Too old' }),
  password: basePasswordSchema
    .regex(/[a-z]/u, {
      error: 'Password must include at least one lowercase letter.',
    })
    .regex(/[A-Z]/u, {
      error: 'Password must include at least one uppercase letter.',
    })
    .regex(/[0-9]/u, { error: 'Password must include at least one number.' })
    .regex(/[!@#$%^&*()_+={}|;:'",.<>?`~]/u, {
      error: 'Password must include at least one special character',
    }),
  address: z.object({
    street: z.string().min(1).max(128),
    geo: z.tuple([z.number({ error: 'Expected longitude to be a number' }), z.number()]),
  }),
});

type User = z.infer<typeof UserSchema>;

const { success, data, error } = UserSchema.safeParse(user);

console.log(success, data, error);
