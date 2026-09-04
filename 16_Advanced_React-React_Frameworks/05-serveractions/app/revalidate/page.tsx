'use server';

import { revalidatePath } from 'next/cache';

const addtodo = async (_formData: FormData) => {
  // Hier würden wir die Änderungen in der Datenbank speichern

  revalidatePath('/todos');
};

const RevalidateExample = async () => {
  return null;
};

export default RevalidateExample;

export { addtodo };
