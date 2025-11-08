import React from 'react';
import { AppColors } from '../../theme/colors';
import { AppTypography } from '../../theme/typography';

interface MainHeaderProps {
  title: string;
  subtitle: string;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ title, subtitle }) => {
  return (
    <header style={{
      width: '100%',
      padding: '60px 24px 30px 24px',
      backgroundColor: AppColors.primary,
      borderRadius: '0 0 24px 24px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start',
      }}>
        <h1 style={{
          ...AppTypography.headerLarge,
          color: AppColors.onPrimary,
          fontSize: '24px',
          marginBottom: '8px',
        }}>
          {title}
        </h1>
        <p style={{
          ...AppTypography.bodyMedium,
          color: AppColors.onPrimary + 'CC',
          margin: 0,
        }}>
          {subtitle}
        </p>
      </div>
    </header>
  );
};