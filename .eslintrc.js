module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': ['error'],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-underscore-dangle': 'warn',
    'react/prop-types': 'warn',
    'react/jsx-filename-extension': 'warn',
    'no-param-reassign': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ]
  }
};
