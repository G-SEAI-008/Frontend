import { useFormStatus } from 'react-dom';

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className={`w-full rounded py-2 text-white ${
        pending ? 'cursor-progress bg-blue-400' : 'cursor-pointer bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {pending ? 'Sending message...' : 'Send Message'}
    </button>
  );
};
export default SubmitBtn;
