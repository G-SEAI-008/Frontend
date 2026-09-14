// oxlint-disable vitest/prefer-expect-assertions
import { describe, expect, test, vi } from 'vitest';

describe('vi.fn', () => {
  test('legt einen Rückgabewert fest und merkt sich den Aufruf', () => {
    const greet = vi.fn<(name: string) => string>().mockReturnValue('Hallo Ada!');

    const result = greet('Ada');

    expect(result).toBe('Hallo Ada!');
    expect(greet).toHaveBeenCalledExactlyOnceWith('Ada');
  });
});

// | Werkzeug                      | Was wir damit machen                                     |
// | ----------------------------- | -------------------------------------------------------- |
// | `vi.fn()`                     | Eine Mock-Funktion erzeugen.                             |
// | `mockResolvedValue(...)`      | Festlegen, mit welchem Wert ihr Promise erfüllt wird.    |
// | `vi.stubGlobal('fetch', ...)` | Das globale `fetch` durch unseren Mock ersetzen.         |
// | `vi.spyOn(console, 'log')`    | Aufrufe von `console.log` beobachten.                    |
// | `vi.unstubAllGlobals()`       | Die mit `stubGlobal` ersetzten Globals wiederherstellen. |
// | `vi.restoreAllMocks()`        | Die mit `spyOn` veränderten Methoden wiederherstellen.   |
