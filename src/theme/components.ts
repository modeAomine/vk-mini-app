import { ButtonStyles } from '../types';
import { AppColors } from './colors';
import { AppTypography } from './typography';

export const AppButtonStyles: ButtonStyles = {
  primary: {
    backgroundColor: AppColors.primary,
    color: AppColors.onPrimary,
    padding: '16px 24px',
    border: 'none',
    borderRadius: '12px',
    fontSize: AppTypography.button.fontSize,
    fontWeight: AppTypography.button.fontWeight,
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  secondary: {
    backgroundColor: AppColors.surface,
    color: AppColors.primary,
    padding: '16px 24px',
    border: `1px solid ${AppColors.primary}`,
    borderRadius: '12px',
    fontSize: AppTypography.button.fontSize,
    fontWeight: AppTypography.button.fontWeight,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  text: {
    backgroundColor: 'transparent',
    color: AppColors.primary,
    padding: '12px 16px',
    border: 'none',
    fontSize: AppTypography.bodyLarge.fontSize,
    fontWeight: AppTypography.bodyLarge.fontWeight,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export const AppCardStyles = {
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden' as const,
  },
  listItem: {
    padding: '8px 16px',
  },
};

export const AppInputStyles = {
  textField: {
    border: `1px solid ${AppColors.secondary}30`,
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    backgroundColor: AppColors.surface,
    transition: 'border-color 0.3s ease',
  },
  textFieldFocus: {
    border: `2px solid ${AppColors.primary}`,
  },
};