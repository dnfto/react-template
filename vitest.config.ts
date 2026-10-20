import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    css: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['src/routeTree.gen.ts', 'tests/**'],
    },
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
  },
});
