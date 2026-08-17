import { useActionState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

import { sendContactForm } from '../api';
import { ErrorFallback, Instructions, SubmitButton } from '../components';

const initalState = {
  error: null,
  input: null,
};

async function contactAction(_previousState, formData) {
  const input = Object.fromEntries(formData);

  try {
    const result = await sendContactForm(input);
    toast.success(result);
    return initalState;
  } catch (error) {
    return {
      error: error.message,
      input,
    };
  }
}

const Contact = () => {
  const [state, formAction] = useActionState(contactAction, initalState);
  return (
    <div className='flex flex-col items-center'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form action={formAction}>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4'>
            <legend className='fieldset-legend'>Contact Us</legend>
            <label className='label' htmlFor='firstName'>
              First Name
            </label>
            <input
              id='firstName'
              className='input w-full'
              name='firstName'
              placeholder='First Name'
              defaultValue={state.input?.firstName}
            />
            <label className='label' htmlFor='lastName'>
              Last Name
            </label>
            <input
              id='lastName'
              className='input w-full'
              name='lastName'
              placeholder='Last Name'
              defaultValue={state.input?.lastName}
            />
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              className='input w-full'
              name='email'
              placeholder='Email'
              defaultValue={state.input?.email}
            />
            <label className='label' htmlFor='message'>
              Message
            </label>
            <textarea
              id='message'
              className='textarea w-full'
              name='message'
              placeholder='Your message'
              rows={4}
              defaultValue={state.input?.message}
            />
            <SubmitButton pendingLabel='Sending...'>Send</SubmitButton>
          </fieldset>
          {state.error && (
            <p className='mt-3 max-w-lg text-sm whitespace-pre-wrap text-red-600' role='alert'>
              {state.error}
            </p>
          )}
        </form>
      </ErrorBoundary>
      <Instructions path='/contact.md' />
    </div>
  );
};

export default Contact;
