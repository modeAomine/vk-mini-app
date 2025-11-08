import bridge from '@vkontakte/vk-bridge';

// Инициализация приложения
export const initVKApp = async (): Promise<void> => {
  try {
    await bridge.send('VKWebAppInit');
    console.log('VK Mini App initialized');
  } catch (error) {
    console.error('Failed to initialize VK app:', error);
  }
};

// Получение данных пользователя
export const getUserInfo = async () => {
  try {
    const user = await bridge.send('VKWebAppGetUserInfo');
    return user;
  } catch (error) {
    console.error('Failed to get user info:', error);
    return null;
  }
};

// Авторизация
export const getAuthToken = async (scope: string = '') => {
  try {
    const authData = await bridge.send('VKWebAppGetAuthToken', {
      app_id: parseInt(import.meta.env.VITE_VK_APP_ID),
      scope: scope
    });
    return authData;
  } catch (error) {
    console.error('Auth failed:', error);
    return null;
  }
};

// Получение параметров запуска
export const getLaunchParams = async () => {
  try {
    const params = await bridge.send('VKWebAppGetLaunchParams');
    return params;
  } catch (error) {
    console.error('Failed to get launch params:', error);
    return null;
  }
};