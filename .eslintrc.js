module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'import/no-absolute-path': 'off', // use a vite alias ?
    'comma-dangle': 'off', // moi j'aime bien
    'space-before-function-paren': 'off', // ???
    camelcase: 'off', // TODO
  },
}
