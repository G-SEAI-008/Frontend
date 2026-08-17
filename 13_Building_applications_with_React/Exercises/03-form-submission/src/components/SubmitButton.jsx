import { useFormStatus } from 'react-dom';

const SubmitButton = ({ children, pendingLabel = 'Submitting...' }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className='btn btn-neutral mt-4 disabled:pointer-events-auto disabled:animate-spin disabled:cursor-progress'
      type='submit'
    >
      {pending ? pendingLabel : children}
    </button>
  );
};
export default SubmitButton;
