import Image from 'next/image';

import { deleteRecipe, getRecipes } from './actions/recipe';

export default async function Home() {
  const recipes = await getRecipes();
  // console.log(recipe);

  return (
    <main className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold'>All Recipes</h1>

      {recipes.map((recipe, index) => (
        <div key={recipe.id} className='space-y-2 border p-3'>
          <h2 className='text-xl font-semibold'>{recipe.title}</h2>
          {recipe.image && (
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={100}
              height={100}
              loading={index === 0 ? 'eager' : 'lazy'}
              className='h-25 w-25 object-cover'
            />
          )}
          <p>Category: {recipe.category}</p>
          <p>Time: {recipe.duration} min</p>

          <p>{recipe.id}</p>
          <form action={deleteRecipe.bind(null, recipe.id)}>
            <button className='cursor-pointer border px-3 py-1'>Delete</button>
          </form>
        </div>
      ))}
    </main>
  );
}
