module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react', 'json', 'perfectionist'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'warn',
    'no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        fallbackSort: { type: 'unsorted' },
        ignoreCase: true,
        specialCharacters: 'keep',
        internalPattern: ['^~/.+'],
        partitionByComment: false,
        partitionByNewLine: true,
        newlinesBetween: 'always',
        maxLineLength: undefined,
        groups: [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        customGroups: { type: {}, value: {} },
        environment: 'node',
      },
    ],
  },
  overrides: [
    {
      'files': ['*/**/*interfaces.ts', '*/**/*.interface.tsx'],
      'rules': {
        'no-unused-vars': ['off', { 'varsIgnorePattern': 'React' }],
      },
    },
  ],
};
