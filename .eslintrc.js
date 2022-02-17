module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
