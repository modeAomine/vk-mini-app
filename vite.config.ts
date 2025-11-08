import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code, id) {
      if (id.includes('@vkontakte/icons')) {
        code = code.replace(/"use-client";?/g, '');
      }
      return { code, map: null };
    },
  };
}

export default defineConfig({
  base: './',
  
  plugins: [
    react(),
    handleModuleDirectivesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: true,
    }),
  ],

  build: {
    outDir: 'build',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Убираем хэши для тестирования
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js', 
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // Добавляем sourcemaps для отладки
    sourcemap: true,
  },

  server: {
    port: 3000,
    host: true
  },

  // Явно указываем типы модулей
  esbuild: {
    supported: {
      'top-level-await': true
    },
  },
});