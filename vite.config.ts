import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      checker({ typescript: true, eslint: { lintCommand: 'eslint .', useFlatConfig: true } }),
    ],
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
    build: {
      sourcemap: mode !== 'production',
      assetsDir: 'assets',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react';
            }
            if (id.includes('node_modules/@tanstack')) {
              return 'tanstack';
            }
            if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/lucide-react')) {
              return 'ui';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  };
});
