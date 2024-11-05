module.exports = {
    env: {
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'next/core-web-vitals',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: true,
                tabWidth: 4,
                tab: true,
                printWidth: 100,
                bracketSpacing: true,
                plugins: ['prettier-plugin-tailwindcss'],
            },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/order': [
            'error',
            {
                groups: ['external', 'internal', ['parent', 'sibling']],
                'newlines-between': 'always-and-inside-groups',
                alphabetize: {
                    order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
                    caseInsensitive: true /* ignore case. Options: [true, false] */,
                },
            },
        ],
        'unused-imports/no-unused-imports': 'warn',
    },
    settings: {
        'import/resolver': {
            // Resolve imports using the tsconfig.json file.
            // See: https://www.npmjs.com/package/eslint-import-resolver-typescript
            typescript: {
                alwaysTryTypes: true,
            },
        },
        react: {
            version: 'detect',
        },
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
};
