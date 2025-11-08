import { TypographyStyles } from '../types';
import { AppColors } from './colors';

export const AppTypography: TypographyStyles = {
  headerLarge: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: AppColors.onSurface,
    lineHeight: 1.2,
    margin: 0,
  },
  headerMedium: {
    fontSize: '22px',
    fontWeight: 600,
    color: AppColors.onSurface,
    lineHeight: 1.3,
    margin: 0,
  },
  headerSmall: {
    fontSize: '18px',
    fontWeight: 500,
    color: AppColors.onSurface,
    lineHeight: 1.4,
    margin: 0,
  },
  bodyLarge: {
    fontSize: '16px',
    fontWeight: 'normal',
    color: AppColors.onSurface,
    lineHeight: 1.5,
    margin: 0,
  },
  bodyMedium: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: AppColors.secondary,
    lineHeight: 1.4,
    margin: 0,
  },
  bodySmall: {
    fontSize: '12px',
    fontWeight: 'normal',
    color: AppColors.secondary,
    lineHeight: 1.3,
    margin: 0,
  },
  button: {
    fontSize: '16px',
    fontWeight: 600,
    color: AppColors.onPrimary,
    lineHeight: 1.5,
  },
};