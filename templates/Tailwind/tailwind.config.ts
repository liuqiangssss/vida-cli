import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}',"./src/pages/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: {
    preflight: false // 禁用tailwind预设样式，与ui组件库冲突
  },
  theme: {
    colors: {

    },
    screens: {

    },
    extend: {}
  },
  plugins: []
};
export default config;
