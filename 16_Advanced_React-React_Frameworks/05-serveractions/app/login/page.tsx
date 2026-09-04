'use client';

import { useActionState } from 'react';

import { loginUser } from '../actions/auth';

const Login = () => {
  const [actionState, formAction, isPending] = useActionState(loginUser, {
    error: null,
    success: false,
  });

  return (
    <div>
      <h2>Login</h2>
      <form action={formAction}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Enter your email'
            className='border'
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Enter your password'
            className='border'
          />
        </div>
        {actionState.error && <p className='text-red-500'>{actionState.error}</p>}
        {actionState.success && <p className='text-green-500'>{actionState.message}</p>}

        <button type='submit' disabled={isPending} className='cursor-pointer rounded border'>
          {isPending ? 'Loggin in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
export default Login;
