import { useState } from 'react';

import { sleep, validate } from './utils/index.js';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await sleep(2000); // Simulate network delay
      console.log('Submitted:', formData);
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }
    setLoading(false);
  };

  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='mx-auto max-w-xl space-y-6 rounded-lg bg-gray-950 p-6 shadow'>
        <h2 className='text-center text-2xl font-bold text-gray-200'>Contact Us</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='name'>
              Name
            </label>
            <input
              name='name'
              id='name'
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
              placeholder='Leia Organa'
            />
            {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='email'>
              Email
            </label>
            <input
              name='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
              placeholder='leia@rebellion.org'
            />
            {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='message'>
              Message
            </label>
            <textarea
              name='message'
              id='message'
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
              placeholder='Tell us how we can help...'
            />
            {errors.message && <p className='mt-1 text-sm text-red-600'>{errors.message}</p>}
          </div>
          <button
            type='submit'
            disabled={loading}
            className={`w-full rounded py-2 text-white ${
              loading
                ? 'cursor-progress bg-blue-400'
                : 'cursor-pointer bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending message...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default App;
