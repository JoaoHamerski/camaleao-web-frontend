module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ]
}
