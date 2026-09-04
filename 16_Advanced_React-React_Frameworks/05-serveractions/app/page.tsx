import { registerUser } from './actions/users';

// oxlint-disable-next-line typescript/require-await
// const createPost = async (formData: FormData) => {
//   'use server';
//   const title = formData.get('title');
//   console.log('New post:', title);
// };

export default function Home() {
  return (
    <div>
      <h2>HOME</h2>
      {/* <form action={createPost}>
        <input className='border' name='title' />
        <button className='cursor-pointer rounded border'>Submit</button>
      </form> */}
      <form action={registerUser}>
        <input className='border' name='username' />
        <input className='border' name='email' />
        <input className='border' name='password' />
        <button className='cursor-pointer rounded border'>Register</button>
      </form>
    </div>
  );
}
