const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface VKUserData {
  id: number;
  first_name: string;
  last_name: string;
  photo_100?: string;
  photo_200?: string;
  access_token?: string;
}

export interface User {
  id: number;
  vk_id: number;
  first_name: string;
  last_name: string;
  photo_100?: string;
  photo_200?: string;
  is_admin: boolean;
  created_at: string;
  updated_at?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
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

  // Регистрация/логин пользователя
  async authUser(vkUserData: VKUserData): Promise<User> {
    return this.request('/auth/vk', {
      method: 'POST',
      body: JSON.stringify(vkUserData),
    });
  }

  // Получение пользователя по VK ID
  async getUserByVkId(vkId: number): Promise<User> {
    return this.request(`/users/vk/${vkId}`);
  }

  // Обновление данных пользователя
  async updateUser(vkId: number, userData: Partial<User>): Promise<User> {
    return this.request(`/users/vk/${vkId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

export const apiService = new ApiService();