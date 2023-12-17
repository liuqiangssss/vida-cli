module.exports = {
  extends: [
    "next/core-web-vitals",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',

    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  ignorePatterns: ['.next', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  rules: {

  },
  overrides: [
    {
      files: ['*.js,*.ts,*.tsx'], // 根据需要调整匹配的文件类型
      rules: {
        'prettier/prettier': 'off', // 禁用与 Prettier 冲突的规则
      },
    },
  ],
};
