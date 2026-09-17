import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    projects: [
      {
        test: {
          globals: true,
          name: 'Unit_Tests',
          environment: 'jsdom',
          setupFiles: ['src/setup.unit.ts'],
          include: ['src/**/*.unit.test.ts?(x)'],
        },
      },
      {
        test: {
          globals: true,
          name: 'Integration_Tests',
          environment: 'jsdom',
          setupFiles: ['src/__tests__/integration/setup.integration.ts'],
          include: ['src/__tests__/integration/**/*.int.test.ts?(x)'],
        },
      },
    ],
  },
});
