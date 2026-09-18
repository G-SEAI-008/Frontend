import { useEffect } from 'react';
import { Form, useActionData, Link, Navigate } from 'react-router';

import { useAuth } from '@/contexts';
import { isErrorResult, isSuccessResult } from '@/types';
import type { AuthActionResult } from '@/types';

const Login = () => {
  const actionData = useActionData<AuthActionResult>();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isSuccessResult(actionData)) {
      login(actionData?.token);
    }
  }, [actionData, login]);

  if (isAuthenticated) {
    return <Navigate to='/app' replace />;
  }

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='bg-base-100 rounded-box w-full max-w-md space-y-4 p-8 shadow-xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold'>Sign in to your account</h2>
        </div>
        {isErrorResult(actionData) && (
          <div className='alert alert-error'>
            <span>{actionData.error}</span>
          </div>
        )}
        <Form method='post' className='space-y-4'>
          <div className='grid gap-1'>
            <label htmlFor='email' className='label'>
              <span className='text-sm'>Email address</span>
            </label>
            <input
              id='email'
              name='email'
              required
              placeholder='Enter your email'
              className='input w-full'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='password' className='label'>
              <span className='text-sm'>Password</span>
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Enter your password'
              className='input w-full'
            />
          </div>
          <div className='grid gap-1'>
            <button type='submit' className='btn btn-primary w-full'>
              Sign in
            </button>
          </div>
          <div className='text-center'>
            <Link to='/register' className='link link-primary'>
              Don’t have an account? Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
