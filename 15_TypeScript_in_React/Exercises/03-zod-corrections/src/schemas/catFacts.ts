// oxlint-disable unicorn/prefer-top-level-await promise/prefer-await-to-then import/no-named-as-default
import z from 'zod';

const CatFactsSchema = z.object({
  fact: z.string(),
  length: z.number(),
  //   length: z.string().catch((ctx) => {
  //     throw new Error(JSON.stringify(ctx.issues));
  //   }),
  //   length: z.number().catch(0),
  //   length: z.number().catch((ctx) => {
  //     console.log(ctx.issues);
  //     return 0;
  //   }),
  //   thumbnail: z.httpUrl().catch(() => 'https://placehold.co/300x300'),
});

// `z.object()` entfernt unbekannte Felder.
// `z.looseObject()` behält unbekannte Felder bei.
// `z.strictObject()` weist unbekannte Felder zurück.

// `.default(0)` liefert `0`, wenn die Eingabe `undefined` ist.
// `.catch(0)` liefert `0`, wenn die Validierung fehlschlägt. Kann aber den Fehler in den Daten verbergen.
// `.transform(...)` verändert einen Wert nach erfolgreicher Validierung.

export { CatFactsSchema };
