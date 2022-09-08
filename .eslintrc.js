module.exports = {
  env: {
    browser: true,
    es2017: true,
  },
  extends: [
    // 'taro',
    'taro/react',
    // 'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    // 'react',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    eqeqeq: 2, // 必须全等
    indent: ['error', 2],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    '@typescript-eslint/semi': ['error', 'never'],
    'no-multi-spaces': 1, //不能用多余的空格
    'no-mixed-spaces-and-tabs': [2, false], //禁止混用tab和空格
    'space-after-keywords': [0, 'always'], //关键字后面是否要空一格
    'space-before-blocks': [0, 'always'], //不以新行开始的块{前面要不要有空格
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
}
