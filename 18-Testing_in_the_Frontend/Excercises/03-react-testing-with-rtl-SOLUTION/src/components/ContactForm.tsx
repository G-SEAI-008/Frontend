import { useActionState } from 'react';
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').pipe(z.email('Email is invalid')),
  message: z.string().min(1, 'Message is required'),
  subscribe: z.boolean(),
});

type FormValues = z.infer<typeof ContactFormSchema>;

type ActionState = {
  success: boolean;
  errors: Partial<Record<keyof FormValues, string>>;
};

const submitAction = async (_prevState: ActionState, formData: FormData) => {
  // FormData kann auch Dateien enthalten; ein Type Cast würde das nicht prüfen.
  const userSubmission = {
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    message: formData.get('message') ?? '',
    subscribe: formData.get('subscribe') === 'on',
  };

  const { data, error, success } = ContactFormSchema.safeParse(userSubmission);

  if (!success) {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    error.issues.forEach((err) => {
      const [field] = err.path;

      if (field === 'name' || field === 'email' || field === 'message' || field === 'subscribe') {
        errors[field] = err.message;
      }
    });

    return { success: false, errors };
  }

  console.log('Form submitted successfully:', data);
  // oxlint-disable-next-line promise/avoid-new no-promise-executor-return
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return { success: true, errors: {} };
};

const ContactForm = () => {
  const [{ success, errors }, formAction, isPending] = useActionState(submitAction, {
    success: false,
    errors: {},
  });

  if (success) {
    return (
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body items-center text-center'>
          <div className='text-success mb-4 text-6xl'>✓</div>
          <h2 className='card-title text-success'>Thank you for your message!</h2>
          <p>We'll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Contact Us</h2>
        <form action={formAction} noValidate>
          <div className='grid w-full gap-1'>
            <label htmlFor='name' className='label'>
              <span className='text-sm'>Name *</span>
            </label>
            <input
              id='name'
              name='name'
              type='text'
              className={`input w-full ${errors.name ? 'input-error' : ''}`}
              placeholder='Enter your name'
              defaultValue=''
            />
            {errors.name && (
              <p role='alert'>
                <span className='text-error text-sm'>{errors.name}</span>
              </p>
            )}
          </div>
          <div className='grid w-full gap-1'>
            <label htmlFor='email' className='label'>
              <span className='text-sm'>Email *</span>
            </label>
            <input
              id='email'
              type='email'
              name='email'
              className={`input w-full ${errors.email ? 'input-error' : ''}`}
              placeholder='Enter your email'
              defaultValue=''
            />
            {errors.email && (
              <p role='alert'>
                <span className='text-error text-sm'>{errors.email}</span>
              </p>
            )}
          </div>
          <div className='grid w-full gap-1'>
            <label htmlFor='message' className='label'>
              <span className='text-sm'>Message *</span>
            </label>
            <textarea
              id='message'
              name='message'
              className={`textarea h-24 w-full ${errors.message ? 'textarea-error' : ''}`}
              placeholder='Enter your message'
              defaultValue=''
            />
            {errors.message && (
              <p role='alert'>
                <span className='text-error text-sm'>{errors.message}</span>
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <label htmlFor='subscribe' className='label mt-5 cursor-pointer justify-start'>
              <input
                id='subscribe'
                name='subscribe'
                type='checkbox'
                className='checkbox checkbox-primary'
              />
              <span className='ml-2 text-sm'>Subscribe to newsletter</span>
            </label>
          </div>
          <div className='card-actions mt-4 justify-end'>
            <button type='submit' className='btn btn-primary' disabled={isPending}>
              {isPending && <span className='loading loading-spinner loading-sm' />}
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
