import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [react(), tailwindcss()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          globals: true,
          name: 'Unit_Tests',
          environment: 'jsdom',
          setupFiles: ['src/setup.unit.ts'],
          include: ['src/**/*.unit.test.ts?(x)'],
        },
      },
      {
        extends: true,
        test: {
          globals: true,
          name: 'Integration_Tests',
          environment: 'jsdom',
          setupFiles: ['src/__tests__/integration/setup.integration.ts'],
          include: ['src/__tests__/integration/**/*.int.test.ts?(x)'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/**/setup*.ts',
        'src/test-utils/**',
        'src/main.tsx',
      ],
      thresholds: { statements: 80, functions: 80 },
    },
  },
});
