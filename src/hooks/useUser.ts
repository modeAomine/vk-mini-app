import { useState } from 'react';
import { User } from '../types';
import { apiService } from '../utils/api';
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

      // Подготавливаем данные для отправки на сервер
      const userData = {
        vk_id: vkUser.id,
        first_name: vkUser.first_name,
        last_name: vkUser.last_name,
        photo_100: vkUser.photo_100 || undefined,
        photo_200: vkUser.photo_200 || undefined,
      };

      // Отправляем на бэкенд - используем saveUser вместо authUser
      const saveResult = await apiService.saveUser(userData);
      
      if (saveResult.success && saveResult.data) {
        setUser(saveResult.data);
        return saveResult.data;
      } else {
        const errorMessage = saveResult.error || 'Failed to save user';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Auth failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Получение пользователя по VK ID
  const fetchUser = async (vkId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const userResult = await apiService.getUserByVkId(vkId);
      
      if (userResult.success && userResult.data) {
        setUser(userResult.data);
      } else {
        const errorMessage = userResult.error || 'User not found';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Обновление телефона
  const updatePhone = async (vkId: number, phone: string): Promise<boolean> => {
    try {
      setError(null);
      
      const updateResult = await apiService.updatePhone(vkId, phone);
      
      if (updateResult.success && updateResult.data) {
        setUser(updateResult.data);
        return true;
      } else {
        const errorMessage = updateResult.error || 'Failed to update phone';
        setError(errorMessage);
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update phone';
      setError(errorMessage);
      return false;
    }
  };

  // Выход
  const logout = (): void => {
    setUser(null);
    setError(null);
  };

  return {
    user,
    loading,
    error,
    authWithVK,
    fetchUser,
    updatePhone,
    logout,
  };
};