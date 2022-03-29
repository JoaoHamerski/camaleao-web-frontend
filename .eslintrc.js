module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    camelcase: 'off',
    'operator-linebreak': ['error', 'before'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
