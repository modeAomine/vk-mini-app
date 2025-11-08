import { User, Address, ApiResponse, VKUserData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  // Аутентификация через VK
  async authUser(vkUserData: VKUserData): Promise<User> {
    return this.request('/api/users/save.ts', {
      method: 'POST',
      body: JSON.stringify(vkUserData),
    });
  }

  // Получение пользователя по VK ID
  async getUserByVkId(vkId: number): Promise<User> {
    return this.request(`/api/vk/${vkId}`);
  }

  // Сохранение/обновление пользователя
  async saveUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/users/save', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Получение профиля пользователя
  async getUserProfile(vkId: number): Promise<ApiResponse<User>> {
    return this.request(`/users/profile/${vkId}`);
  }

  // Обновление телефона
  async updatePhone(vkId: number, phone: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${vkId}/phone`, {
      method: 'PUT',
      body: JSON.stringify({ phone }),
    });
  }

  // Работа с адресами
  async getUserAddresses(userId: number): Promise<ApiResponse<Address[]>> {
    return this.request(`/users/${userId}/addresses`);
  }

  async addAddress(addressData: Omit<Address, 'id' | 'created_at'>): Promise<ApiResponse<Address>> {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async deleteAddress(addressId: number): Promise<ApiResponse<void>> {
    return this.request(`/addresses/${addressId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();