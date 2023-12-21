export const reactAppTsx = `import React from 'react';
{{#if includeRouter}}
import { BrowserRouter } from 'react-router-dom';
import Routes from '@/router'
{{else}}
import Home from '@/pages/home';
{{/if}}
{{#if includeRedux}}
import { Provider } from 'react-redux';
import store from './store/store.ts';
{{/if}}
const App: React.FC = () => {
  return (
    <>
    {{#if includeRouter}}
      <BrowserRouter>
    {{/if}}
        {{#if includeRedux}}
          <Provider store={store}>
        {{/if}}
        {{#if includeRouter}}
            <Routes />
        {{else}}
            <Home/>
         {{/if}}
 
        {{#if includeRedux}}
          </Provider>
        {{/if}}
    {{#if includeRouter}}
       </BrowserRouter>
    {{/if}}
    </>
  );
};
export default App;
`;
export const viteConfigTs = `import terser from '@rollup/plugin-terser';
{{#if isReact}}
import react from '@vitejs/plugin-react';
{{/if}}
{{#if isVue}}
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
{{/if}}
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
{{#if includeTailWind}}
import postcssConfig from "./postcss.config.js";
{{/if}}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.PUBLIC_PATH || '/',
  plugins: [
    {{#if isReact}}
      react(),
    {{/if}}
    {{#if isVue}}
    vue(),
    vueJsx(),
    {{/if}}
    svgr(),
    visualizer(),
    viteCompression({
      algorithm: 'brotliCompress' // 或 'brotli'
    })
  ],
  server: {
    host: '127.0.0.1',
    port: 3000
  },
  build: {
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
    cssCodeSplit: true, // 启用 CSS 代码拆分
    chunkSizeWarningLimit: 500, // 警告提示的最大阈值
    manifest: true,
    rollupOptions: {
      plugins: [terser()],
      output: {
        manualChunks(id) {
          try {
            if (id.includes('node_modules')) {
              const name = id.split('node_modules/')[1].split('/');
              if (name[0] == '.pnpm') {
                return name[1];
              } else {
                return name[0];
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    {{#if includeTailWind}}
    postcss: postcssConfig,
    {{/if}}
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/variables.scss";' // 导入自定义的全局变量文件
      }
    }
  }
});

`;

export const axiosTemplate = `import axios, { InternalAxiosRequestConfig } from 'axios';

const request = axios.create({
  timeout: 10000,
  withCredentials: true
});
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});
request.interceptors.response.use();
export default request;
`;

export const tailwindcss = `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}`;
export const vueMainTs = `import { createApp } from "vue";
import "./index.css";
import App from "./App.tsx";
{{#if router}}
import { registerRouter } from "@/router";
{{/if}}
{{#if pinia}}
import { setupStore } from "@/store/index.ts";
{{/if}}
import { setDirectives } from "@/directives";
const app = createApp(App);

function bootStrap() {
  {{#if pinia}}
  setupStore(app);
  {{/if}}
  {{#if router}}
  registerRouter(app);
  {{/if}}
  setDirectives(app);
  app.mount("#app");
}

bootStrap();
`;
export const vueAppTsx = `import { defineComponent, onMounted } from "vue";
{{#if router}}
import { RouterView } from "vue-router";
{{else}}
import Home from "@/pages/home";
{{/if}}


export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {});
    return () => (
      <>
      {{#if router}}
        <RouterView />
      {{else}}
        <Home />
      {{/if}}
      </>
    );
  },
});
`;
export const vueHooks = `import { useCounterStore } from '@/store/modules/counter';

export function useUser() {
  const { count, doubleCount, increment } = useCounterStore();

  const handleCounter = () => {
    // Todo
    increment();
  };

  return {
    doubleCount,
    count,
    handleCounter
  };
}
`;


export const reactPackageJson= `{
  "name": "{{projectName}}",
  "private": true, 
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    {{#if husky}}
    "prepare": "husky install", 
    "lint-staged" : "lint-staged",
    {{/if}}
    "format": "prettier --write './src/**/*.{ts,tsx,js,jsx}'"
  },
  {{#if husky}}
  "lint-staged": {
    "./src/**/*.{ts,tsx,js,jsx}": [
      "eslint --fix --quiet",
      "prettier --write",
      "git add"
    ]
  },
  {{/if}}
  "dependencies": {
    {{#if @ant-design/icons}}
    "@ant-design/icons": "^5.2.5",
    {{/if}}
    {{#if antd}}
    "antd": "^5.8.4",
    {{/if}}
    {{#if tailwindcss}}
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.29",
    "tailwindcss": "^3.3.3",
    {{/if}}
    {{#if axios}}
    "axios": "^1.5.0",
    {{/if}}
    {{#if dayjs}}
    "dayjs": "^1.11.9",
    {{/if}}
    {{#if react-redux}}
    "@reduxjs/toolkit": "^1.9.5",
    "react-redux": "^8.1.2",
    {{/if}}
    {{#if classnames}}
    "classnames": "^2.3.2",
    {{/if}}
    {{#if react-router-dom}}
    "react-router-dom": "^6.14.2",
    {{/if}}
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@rollup/plugin-terser": "^0.4.3",
    "@types/node": "18.15.3",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "prettier": "^3.0.3",
    "prettier-plugin-organize-imports": "^3.2.3",
    "rollup-plugin-visualizer": "^5.9.2",
    "sass": "^1.53.0",
    "typescript": "^5.0.2",
    {{#if husky}}
    "husky": "^8.0.3",
    "lint-staged": "^10.5.4",
    "commitlint": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    {{/if}}
    "vite": "^4.4.5",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-svgr": "^3.2.0"
  }
}`