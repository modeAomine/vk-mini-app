import { User, Address, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const VERCEL_BYPASS_SECRET = import.meta.env.VERCEL_AUTOMATION_BYPASS_SECRET || 'byesiOoq8uijFia6jOCY1nIoBbujcvEh';

export class ApiService {
  private baseUrl: string;
  private bypassSecret: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.bypassSecret = VERCEL_BYPASS_SECRET;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const headers = {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': this.bypassSecret, // ДОБАВЛЯЕМ ЗАГОЛОВОК
        'x-vercel-set-bypass-cookie': 'true',
        ...options.headers,
      };

      const response = await fetch(url, {
        headers,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Сохранение/обновление пользователя при авторизации
  async saveUser(userData: {
    vk_id: number;
    first_name: string;
    last_name: string;
    photo_100?: string;
    photo_200?: string;
  }): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Получение пользователя по VK ID
  async getUserByVkId(vkId: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/vk/${vkId}`);
  }

  // Обновление телефона
  async updatePhone(vkId: number, phone: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${vkId}/phone?phone=${encodeURIComponent(phone)}`, {
      method: 'PATCH',
    });
  }

  // Получение адресов пользователя
  async getUserAddresses(userId: number): Promise<ApiResponse<Address[]>> {
    return this.request<Address[]>(`/addresses/user/${userId}`);
  }

  // Добавление адреса
  async addAddress(addressData: {
    user_id: number;
    title: string;
    address_text: string;
  }): Promise<ApiResponse<Address>> {
    return this.request<Address>('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  // Удаление адреса
  async deleteAddress(addressId: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/addresses/${addressId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();