import { useActionState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './components/ErrorFallback.jsx';
import SubmitBtn from './components/SubmitBtn.jsx';
import { sleep, validate } from './utils/index.js';

const action = async (_prevState, formData) => {
  console.log(_prevState);
  // console.log(formData.get('name'));
  // console.log(formData.get('email'));
  // console.log(formData.get('message'));
  const data = Object.fromEntries(formData);
  const validationErrors = validate(data);

  if (Object.keys(validationErrors).length === 0) {
    await sleep(2000); // Simulate network delay
    console.log('Submitted:', data);
    alert('Form submitted successfully!');
    return {};
  }

  return {
    errors: validationErrors,
    input: data,
  };
};

const App = () => {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='mx-auto max-w-xl space-y-6 rounded-lg bg-gray-950 p-6 shadow'>
        <h2 className='text-center text-2xl font-bold text-gray-200'>Contact Us</h2>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <form action={formAction} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-200' htmlFor='name'>
                Name
              </label>
              <input
                name='name'
                id='name'
                defaultValue={state.input?.name}
                // onChange={handleChange}
                disabled={isPending}
                className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
                placeholder='Leia Organa'
              />
              {state.errors?.name && (
                <p className='mt-1 text-sm text-red-600'>{state.errors.name}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-200' htmlFor='email'>
                Email
              </label>
              <input
                name='email'
                id='email'
                defaultValue={state.input?.email}
                // onChange={handleChange}
                disabled={isPending}
                className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
                placeholder='leia@rebellion.org'
              />
              {state.errors?.email && (
                <p className='mt-1 text-sm text-red-600'>{state.errors.email}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-200' htmlFor='message'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                rows={4}
                defaultValue={state.input?.message}
                // onChange={handleChange}
                disabled={isPending}
                className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
                placeholder='Tell us how we can help...'
              />
              {state.errors?.message && (
                <p className='mt-1 text-sm text-red-600'>{state.errors.message}</p>
              )}
            </div>
            <SubmitBtn />
          </form>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default App;
