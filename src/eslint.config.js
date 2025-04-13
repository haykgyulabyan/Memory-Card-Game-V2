import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfigs from 'eslint-config-prettier';
import eslintParser from '@typescript-eslint/parser';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfigs],
    files: ['**/*.{ts,tsx}'],
    settings: { react: { version: '19.0.0' } },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: eslintParser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslint,
      prettier,
      react,
      import: importPlugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-shadow': 0,
      'no-console': 1,
      'no-unused-vars': 0,
      'no-nested-ternary': 0,
      'import/extensions': 0,
      'no-use-before-define': 0,
      'react/self-closing-comp': 2,
      'react/react-in-jsx-scope': 0,
      'jsx-a11y/media-has-caption': 0,
      'react-hooks/exhaustive-deps': 0,
      '@typescript-eslint/no-shadow': 1,
      'import/prefer-default-export': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-no-useless-fragment': 2,
      'react/jsx-curly-brace-presence': 2,
      '@typescript-eslint/no-unused-vars': 2,
      '@typescript-eslint/no-explicit-any': 0,
      'react/function-component-definition': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
      'import/order': [2, { 'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'] }],
    },
  },
);
