import { useState, useCallback, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { User } from '../types';
import { apiService } from '../utils/api'; // ДОБАВИТЬ ИМПОРТ

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Получаем данные пользователя из VK
      const vkUserData = await bridge.send('VKWebAppGetUserInfo');
      
      // 2. Отправляем на сервер для сохранения в БД
      const userData = {
        vk_id: vkUserData.id,
        first_name: vkUserData.first_name,
        last_name: vkUserData.last_name,
        photo_100: vkUserData.photo_100 || undefined,
        photo_200: vkUserData.photo_200 || undefined,
      };

      const saveResult = await apiService.saveUser(userData);
      
      if (saveResult.success && saveResult.data) {
        setUser(saveResult.data);
        return saveResult.data;
      } else {
        const errorMessage = saveResult.error || 'Failed to save user';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  // Автоматический логин при монтировании компонента
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        await login();
      } catch (error) {
        if (mounted) {
          console.error('Auth initialization failed:', error);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [login]);

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
};