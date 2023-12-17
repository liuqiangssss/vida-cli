module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',

    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  ignorePatterns: ['.eslintrc.cjs',"*.config.js"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment' : 'off',
  },
  overrides: [
    {
      files: ['*.js,*.ts,*.tsx'], // 根据需要调整匹配的文件类型
      rules: {
        'prettier/prettier': 'off' // 禁用与 Prettier 冲突的规则
      }
    }
  ]
};
