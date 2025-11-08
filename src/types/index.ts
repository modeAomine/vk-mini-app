import { FC } from "react";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  photo_100?: string;
  photo_200?: string;
  vk_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Address {
  id?: number;
  user_id: number;
  title: string;
  address_text: string;
  created_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserProfile extends User {
  addresses: Address[];
}

export interface MenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  panel?: string;
  route?: string;
  action?: () => void;
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  onPrimary: string;
  onSecondary: string;
  onBackground: string;
  onSurface: string;
  onError: string;
  outline: string;
  success: string;
  textPrimary: string;
  textSecondary: string;
}

export interface ButtonStyles {
  primary: React.CSSProperties;
  secondary: React.CSSProperties;
  text: React.CSSProperties;
}

export interface TypographyStyles {
  headerLarge: React.CSSProperties;
  headerMedium: React.CSSProperties;
  headerSmall: React.CSSProperties;
  bodyLarge: React.CSSProperties;
  bodyMedium: React.CSSProperties;
  bodySmall: React.CSSProperties;
  button: React.CSSProperties;
}

export interface VKUserInfo {
  id: number;
  first_name: string;
  last_name: string;
  photo_100?: string;
  photo_200?: string;
}

export interface VKUserData {
  id: number;
  first_name: string;
  last_name: string;
  photo_100?: string;
  photo_200?: string;
  access_token?: string;
}

export interface MenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  component?: FC<NavigationProps>;
  action?: () => void;
}

export interface NavigationProps {
  onNavigate: (component: FC<NavigationProps> | string) => void;
}