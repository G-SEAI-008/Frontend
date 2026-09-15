import { useActionState } from 'react';
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Email is invalid').min(1, 'Email is required'),
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
          <div className='form-control w-full'>
            <label htmlFor='name' className='label'>
              <span className='label-text'>Name *</span>
            </label>
            <input
              id='name'
              name='name'
              type='text'
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              placeholder='Enter your name'
              defaultValue=''
            />
            {errors.name && (
              <label className='label'>
                <span className='label-text-alt text-error'>{errors.name}</span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label htmlFor='email' className='label'>
              <span className='label-text'>Email *</span>
            </label>
            <input
              name='email'
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              placeholder='Enter your email'
              defaultValue=''
            />
            {errors.email && (
              <label className='label'>
                <span className='label-text-alt text-error'>{errors.email}</span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label htmlFor='message' className='label'>
              <span className='label-text'>Message *</span>
            </label>
            <textarea
              name='message'
              className={`textarea textarea-bordered h-24 w-full ${
                errors.message ? 'textarea-error' : ''
              }`}
              placeholder='Enter your message'
              defaultValue=''
            />
            {errors.message && (
              <label className='label'>
                <span className='label-text-alt text-error'>{errors.message}</span>
              </label>
            )}
          </div>
          <div className='form-control'>
            <label htmlFor='subscribe' className='label mt-5 cursor-pointer justify-start'>
              <input
                id='subscribe'
                name='subscribe'
                type='checkbox'
                className='checkbox checkbox-primary'
              />
              <span className='label-text ml-2'>Subscribe to newsletter</span>
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
