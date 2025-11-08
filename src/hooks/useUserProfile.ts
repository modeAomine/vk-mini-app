import { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { User, Address } from '../types'; // Импортируем из types
import { apiService } from '../utils/api'; // Только apiService из utils/api
import { useAuth } from './useAuth';

export const useUserProfile = () => {
  const { user: authUser, login } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных пользователя
  const loadUserProfile = useCallback(async (vkUser: User) => {
    try {
      setLoading(true);
      setError(null);

      // Сохраняем пользователя в БД
      const userData = {
        vk_id: vkUser.vk_id,
        first_name: vkUser.first_name,
        last_name: vkUser.last_name,
        photo_100: vkUser.photo_100,
        photo_200: vkUser.photo_200,
      };

      const saveResult = await apiService.saveUser(userData);
      
      if (saveResult.success && saveResult.data) {
        setUser(saveResult.data);
        
        // Загружаем адреса пользователя
        const addressesResult = await apiService.getUserAddresses(saveResult.data.id);
        if (addressesResult.success && addressesResult.data) {
          setAddresses(addressesResult.data);
        }
      } else {
        throw new Error(saveResult.error || 'Failed to save user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      console.error('Profile loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление телефона
  const updatePhone = useCallback(async (phone: string) => {
    if (!user) return false;

    try {
      setSaving(true);
      const result = await apiService.updatePhone(user.vk_id, phone);
      
      if (result.success && result.data) {
        setUser(result.data);
        return true;
      } else {
        throw new Error(result.error || 'Failed to update phone');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update phone');
      return false;
    } finally {
      setSaving(false);
    }
  }, [user]);

  // Добавление адреса
  const addAddress = useCallback(async (title: string, addressText: string) => {
    if (!user) return false;

    try {
      const result = await apiService.addAddress({
        user_id: user.id,
        title,
        address_text: addressText,
      });

      if (result.success && result.data) {
        setAddresses(prev => [...prev, result.data!]);
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to add address');
      return false;
    }
  }, [user]);

  // Удаление адреса
  const deleteAddress = useCallback(async (addressId: number) => {
    try {
      const result = await apiService.deleteAddress(addressId);
      
      if (result.success) {
        setAddresses(prev => prev.filter(addr => addr.id !== addressId));
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to delete address');
      return false;
    }
  }, []);

  // Получение номера телефона из VK
  const getVKPhone = useCallback(async () => {
    try {
      const phoneData = await bridge.send('VKWebAppGetPhoneNumber');
      if (phoneData.phone_number) {
        await updatePhone(phoneData.phone_number);
      }
    } catch (err) {
      console.log('Phone number access denied or not available');
    }
  }, [updatePhone]);

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        // Используем данные из useAuth
        if (!authUser) {
          await login(); // Если пользователя нет, логинимся
        } else {
          await loadUserProfile(authUser);
        }
      } catch (err) {
        setError('Failed to initialize profile');
        setLoading(false);
      }
    };

    if (authUser) {
      initializeProfile();
    }
  }, [authUser, login, loadUserProfile]);

  return {
    user,
    addresses,
    loading: loading || !authUser,
    saving,
    error,
    updatePhone,
    addAddress,
    deleteAddress,
    getVKPhone,
    refreshProfile: () => user && loadUserProfile(user),
  };
};