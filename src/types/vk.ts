export interface VKUser {
  id: number;
  first_name: string;
  last_name: string;
  photo_100: string;
  photo_200: string;
}

export interface LaunchParams {
  vk_user_id: number;
  vk_app_id: number;
  vk_is_app_user: number;
  vk_are_notifications_enabled: number;
  vk_language: string;
  vk_ref: string;
  vk_access_token_settings: string;
  vk_group_id: number;
  vk_viewer_group_role: string;
  vk_platform: string;
  vk_is_favorite: number;
  sign: string;
}

export interface VKAuthData {
  access_token: string;
  scope: string;
  user: VKUser;
}