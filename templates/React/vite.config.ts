import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import postcssConfig from './postcss.config';
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.PUBLIC_PATH || '/',
  plugins: [
    react(),
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
    postcss: postcssConfig,
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/variables.scss";' // 导入自定义的全局变量文件
      }
    }
  }
});
