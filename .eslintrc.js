module.exports = {
  env: {
    jest: true,
  },
  extends: [
    '@react-native-community',
    'plugin:jest/all',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort', 'jest'],
  root: true,
  rules: {
    'import/order': 'off',
    'jest/no-hooks': ['error', { allow: ['beforeEach'] }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
  },
}
