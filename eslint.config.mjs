import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';

export default [{
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
        react,
    },
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    ignores: [
        '**/node_modules/**',
        '**/build/**',
        '**/temp.js',
        'config/*',
        'eslint.config.mjs',
        'commitlint.config.js',
        'public/pdf.worker.min.js'
    ],
    rules: {
        'no-unused-vars': ['error',  {
            varsIgnorePattern: '^(?!$)',
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^[A-Z]',
            args: 'none', 
            ignoreRestSiblings: true, 
        }],
        'quotes': ['error', 'single', { avoidEscape: true }],
        'semi': ['error', 'always'],
        'indent': ['error', 2],
        'no-console': ['error', {
            allow: ['error', 'warn'],
        }],
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'all'],
        'comma-dangle': ['error', 'always-multiline'],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-debugger': 'warn',
        'prefer-const': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-magic-numbers': ['warn', { ignore: [0, 1] }],
    },
}, ];