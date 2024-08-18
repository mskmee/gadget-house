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
  plugins: ['react-refresh', 'react', 'json'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'warn',
    'no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
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
