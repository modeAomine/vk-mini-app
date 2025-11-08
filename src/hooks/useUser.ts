import { useState } from 'react';
import { User, VKUserData, apiService } from '../utils/api';
import bridge from '@vkontakte/vk-bridge';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Авторизация через VK
  const authWithVK = async (): Promise<User> => {
    try {
      setLoading(true);
      setError(null);

      // Получаем данные пользователя из VK
      const vkUser = await bridge.send('VKWebAppGetUserInfo');
      const tokenData = await bridge.send('VKWebAppGetAuthToken', {
        app_id: parseInt(import.meta.env.VITE_VK_APP_ID),
        scope: 'friends,photos'
      });

      const vkUserData: VKUserData = {
        id: vkUser.id,
        first_name: vkUser.first_name,
        last_name: vkUser.last_name,
        photo_100: vkUser.photo_100,
        photo_200: vkUser.photo_200,
        access_token: tokenData.access_token
      };

      // Отправляем на бэкенд
      const userData = await apiService.authUser(vkUserData);
      setUser(userData);
      return userData;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Auth failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Получение пользователя
  const fetchUser = async (vkId: number) => {
    try {
      setLoading(true);
      const userData = await apiService.getUserByVkId(vkId);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  // Выход
  const logout = () => {
    setUser(null);
    // Можно добавить очистку токенов и т.д.
  };

  return {
    user,
    loading,
    error,
    authWithVK,
    fetchUser,
    logout,
  };
};