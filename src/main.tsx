import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import bridge from '@vkontakte/vk-bridge';

// Инициализация VK Bridge - ДО загрузки основных ресурсов
bridge.send("VKWebAppInit")
  .then(() => {
    console.log('VK Mini App initialized');
  })
  .catch((error) => {
    console.error('VK Mini App initialization failed:', error);
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);