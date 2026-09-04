import { registerUser } from '../actions/users';

const Register = () => {
  return (
    // ALTERNATIV: Schaut euch Form Components von Next.js an: https://nextjs.org/docs/app/api-reference/components/form
    <form action={registerUser}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          name='username'
          placeholder='Enter your username'
          className='border'
        />
      </div>

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

      <button type='submit' className='cursor-pointer rounded border'>
        Register
      </button>
    </form>
  );
};
export default Register;
