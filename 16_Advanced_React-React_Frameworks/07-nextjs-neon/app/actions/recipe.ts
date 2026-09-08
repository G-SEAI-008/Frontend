'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const DatabaseUrlSchema = z.string().trim().min(1, 'DATABASE_URL fehlt');
// const DatabaseUrlSchema = z.url({
//   protocol: /^postgres(?:ql)?$/u,
// });

const RecipeIdSchema = z.number().int().positive();

const RecipeSchema = z.object({
  id: RecipeIdSchema,
  title: z.string(),
  category: z.string(),
  duration: z.number().int(),
  servings: z.number().int(),
  image: z.string().nullable(),
  created_at: z.date(),
});

const RecipeFormSchema = z.object({
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  duration: z.coerce.number().int().positive(),
  servings: z.coerce.number().int().positive(), // Number("") -> 0  Number(xcvxcv) -> NaN
});

type RecipeActionState = {
  error?: string | null;
  success?: boolean;
  message?: string;
};

const databaseUrl = DatabaseUrlSchema.parse(process.env.DATABASE_URL);
const sql = neon(databaseUrl);

const getRecipes = async () => {
  // findMany()
  const recipes: unknown = await sql`
    SELECT * FROM recipes ORDER BY created_at DESC`;

  return z.array(RecipeSchema).parse(recipes);
};

const addRecipe = async (
  _prevState: RecipeActionState,
  formData: FormData,
): Promise<RecipeActionState> => {
  const { success, data } = RecipeFormSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return {
      error: 'Bitte alle Felder ausfüllen. Dauer und Portionen müssen positive ganze Zahlen sein.',
    };
  }

  const { title, category, duration, servings } = data;

  await sql`
INSERT INTO recipes (title, category, duration, servings) VALUES (${title}, ${category}, ${duration}, ${servings})`;

  revalidatePath('/');

  return {
    success: true,
    message: `${title} wurde hinzugefügt`,
  };
};

const deleteRecipe = async (id: number): Promise<void> => {
  const recipeId = RecipeIdSchema.parse(id);

  await sql`DELETE FROM recipes WHERE id = ${recipeId}`;

  revalidatePath('/');
};

export { getRecipes, addRecipe, type RecipeActionState, deleteRecipe };
