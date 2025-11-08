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
      return { code };
    },
  };
}

export default defineConfig({
  // Меняем base для GitHub Pages
  base: '/vk-mini-app/', // ЗАМЕНИТЕ на имя вашего репозитория
  
  plugins: [
    react(),
    handleModuleDirectivesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],

  build: {
    outDir: 'build', // Оставляем как в VK конфиге
  },
});