'use client';

import { useActionState } from 'react';

import type { RecipeActionState } from '../actions/recipe';
import { addRecipe } from '../actions/recipe';

export default function AddRecipe() {
  const [state, formAction, isPending] = useActionState<RecipeActionState, FormData>(addRecipe, {
    error: null,
    success: false,
  });

  return (
    <main className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold'>Add Recipe</h1>

      <form action={formAction} className='flex max-w-md flex-col gap-3'>
        <label className='flex flex-col gap-1'>
          Recipe title
          <input className='border p-2' name='title' placeholder='Recipe title' required />
        </label>

        <label className='flex flex-col gap-1'>
          Category
          <input className='border p-2' name='category' placeholder='Category' required />
        </label>

        <label className='flex flex-col gap-1'>
          Duration (min)
          <input
            className='border p-2'
            name='duration'
            type='number'
            min={1}
            step={1}
            placeholder='Duration (min)'
            required
          />
        </label>

        <label className='flex flex-col gap-1'>
          Servings
          <input
            className='border p-2'
            name='servings'
            type='number'
            min={1}
            step={1}
            placeholder='Servings'
            required
          />
        </label>

        {state.error && (
          <p className='text-red-700' role='alert'>
            {state.error}
          </p>
        )}
        {state.success && <output className='text-green-700'>{state.message}</output>}

        <button
          className='cursor-pointer border px-3 py-2 disabled:opacity-50'
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add Recipe'}
        </button>
      </form>
    </main>
  );
}
