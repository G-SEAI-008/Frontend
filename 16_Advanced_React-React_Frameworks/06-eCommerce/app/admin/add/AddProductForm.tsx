'use client';

import { useActionState } from 'react';

import type { AddProductState } from './actions';
import { addProduct } from './actions';

const initalState: AddProductState = {
  status: 'idle',
  message: '',
};

const AddProductForm = () => {
  const [state, formAction, isPending] = useActionState(addProduct, initalState);

  return (
    <form action={formAction} className='grid max-w-lg gap-4'>
      <label className='grid gap-1'>
        Title
        <input name='title' placeholder='Product title' className='field' required />
      </label>

      <label className='grid gap-1'>
        Price
        <input
          name='price'
          type='number'
          min='0.01'
          step='0.01'
          placeholder='0.00'
          className='field'
          required
        />
      </label>

      <label className='grid gap-1'>
        Category
        <select name='category' className='field cursor-pointer' required>
          <option value=''>Select a category</option>
          <option value='electronics'>Electronics</option>
          <option value='jewelery'>Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </label>

      {state.status !== 'idle' && (
        <p className={state.status === 'error' ? 'text-red-700' : 'text-green-700'}>
          {state.message}
        </p>
      )}

      <button className='button' disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProductForm;
