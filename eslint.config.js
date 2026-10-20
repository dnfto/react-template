import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'playwright-report', 'src/routeTree.gen.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => Object.assign(config, { files: ['**/*.{ts,tsx}'] })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'jsx-a11y/heading-has-content': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', 'tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['src/app/router/router.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
);
