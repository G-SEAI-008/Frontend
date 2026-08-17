import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

import { registerNewsletter } from '../api';
import { ErrorFallback, Instructions } from '../components';
import SubmitButton from '../components/SubmitButton';

async function registerAction(formData) {
  const email = formData.get('email');
  const result = await registerNewsletter(email);
  toast.success(result);
}

const Register = () => {
  return (
    <div className='flex flex-col items-center'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form action={registerAction}>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4'>
            <legend className='fieldset-legend'>Register to our newsletter</legend>
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input className='input w-full' name='email' placeholder='Email' id='email' />
            <SubmitButton pendingLabel='Registering...'>Register</SubmitButton>
          </fieldset>
        </form>
      </ErrorBoundary>
      <Instructions path='/register.md' />
    </div>
  );
};

export default Register;
