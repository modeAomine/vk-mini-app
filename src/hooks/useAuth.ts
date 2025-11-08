import { useState, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (): Promise<User> => {
    try {
      setLoading(true);
      const vkUserData = await bridge.send('VKWebAppGetUserInfo');
      
      // Преобразуем VK UserInfo в наш User тип
      const userData: User = {
        id: vkUserData.id, // Используем VK ID как временный ID
        vk_id: vkUserData.id,
        first_name: vkUserData.first_name,
        last_name: vkUserData.last_name,
        photo_100: vkUserData.photo_100,
        photo_200: vkUserData.photo_200,
      };
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
};