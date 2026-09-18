// oxlint-disable vitest/require-top-level-describe unicorn/consistent-function-scoping -- Einmalige Browser-Ergänzungen für alle Integrationstests.
import '@testing-library/jest-dom/vitest';
import { beforeAll } from 'vitest';

beforeAll(() => {
  // jsdom hat keine nativen Dialogfenster. Für die Tests genügt der open-Zustand.
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
});
