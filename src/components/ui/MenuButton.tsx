import React from 'react';
import { AppColors } from '../../theme/colors';
import { AppTypography } from '../../theme/typography';
import { AppCardStyles } from '../../theme/components';

interface MenuButtonProps {
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <div 
      style={{
        ...AppCardStyles.card,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      <div style={AppCardStyles.listItem}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: AppColors.primary + '1A',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: '24px',
              color: AppColors.primary,
            }}>
              {icon}
            </span>
          </div>
          
          <div style={{
            flex: 1,
            minWidth: 0,
          }}>
            <h3 style={{
              ...AppTypography.headerSmall,
              marginBottom: '4px',
            }}>
              {title}
            </h3>
            <p style={{
              ...AppTypography.bodySmall,
              margin: 0,
            }}>
              {subtitle}
            </p>
          </div>
          
          <span style={{
            color: AppColors.primary,
            fontSize: '16px',
          }}>
            →
          </span>
        </div>
      </div>
    </div>
  );
};