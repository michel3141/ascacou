module.exports = {
  settings: {
    "react": {
      "version": "detect",
    },
  },
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'prettier',
    'standard',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react',
    //'react-refresh'
  ],
  rules: {
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",

    // 'react-refresh/only-export-components': 'warn',

    'react/prop-types': 'off',
    camelcase: 'warn',
    // TODO
    'import/no-absolute-path': 'off',
    // use a vite alias ? attention autofixabvle par --fix
    "no-bitwise": 'error',

  },
};
