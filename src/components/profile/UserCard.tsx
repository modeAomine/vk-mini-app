import React, { useState } from 'react';
import { Div, Avatar, Title, Text, Button, Input } from '@vkontakte/vkui';
import { AppColors } from '../../theme/colors';
import { AppTypography } from '../../theme/typography';
import { User } from '../../types';

interface UserCardProps {
  user: User;
//   onPhoneUpdate: (phone: string) => Promise<boolean>;
  onGetVKPhone: () => Promise<void>;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
//   onPhoneUpdate, 
  onGetVKPhone 
}) => {
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phone, setPhone] = useState(user.phone || '');
  const [savingPhone, setSavingPhone] = useState(false);

  const handleSavePhone = async () => {
    if (!phone.trim()) return;

    setSavingPhone(true);
    // const success = await onPhoneUpdate(phone.trim());
    setSavingPhone(false);

    // if (success) {
    //   setIsEditingPhone(false);
    // }
  };

  const handleGetVKPhone = async () => {
    await onGetVKPhone();
  };

  return (
    <Div style={{
      backgroundColor: AppColors.surface,
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '24px',
    }}>
      {/* Заголовок и аватар */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
      }}>
        <Avatar 
          src={user.photo_200} 
          size={80}
          style={{
            border: `3px solid ${AppColors.primary}`,
          }}
        />
        <div style={{ flex: 1 }}>
          <Title level="2" style={{ margin: 0, marginBottom: '4px' }}>
            {user.first_name} {user.last_name}
          </Title>
          <Text style={{ 
            color: AppColors.textSecondary,
            margin: 0,
          }}>
            Пользователь VK
          </Text>
        </div>
      </div>

      <div style={{
        height: '1px',
        backgroundColor: AppColors.outline,
        margin: '16px 0',
      }} />

      {/* Информация о пользователе */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {/* VK ID */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ 
            fontSize: '20px',
            color: AppColors.primary,
          }}>
            🔑
          </span>
          <div style={{ flex: 1 }}>
            <Text style={{ 
              ...AppTypography.bodyMedium,
              color: AppColors.textSecondary,
              margin: 0,
            }}>
              VK ID
            </Text>
            <Text style={{ margin: 0 }}>
              {user.vk_id}
            </Text>
          </div>
        </div>

        {/* Телефон */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ 
            fontSize: '20px',
            color: AppColors.primary,
          }}>
            📱
          </span>
          <div style={{ flex: 1 }}>
            <Text style={{ 
              ...AppTypography.bodyMedium,
              color: AppColors.textSecondary,
              margin: 0,
            }}>
              Телефон
            </Text>
            
            {isEditingPhone ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (XXX) XXX-XX-XX"
                  style={{ flex: 1 }}
                />
                <Button 
                  size="s"
                  loading={savingPhone}
                  onClick={handleSavePhone}
                >
                  ✅
                </Button>
                <Button 
                  size="s"
                  mode="tertiary"
                  onClick={() => {
                    setIsEditingPhone(false);
                    setPhone(user.phone || '');
                  }}
                >
                  ❌
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Text style={{ margin: 0 }}>
                  {user.phone || 'Не указан'}
                </Text>
                <Button 
                  size="s"
                  mode="tertiary"
                  onClick={() => setIsEditingPhone(true)}
                >
                  ✏️
                </Button>
                {!user.phone && (
                  <Button 
                    size="s"
                    mode="secondary"
                    onClick={handleGetVKPhone}
                  >
                    Получить из VK
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Email */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ 
            fontSize: '20px',
            color: AppColors.primary,
          }}>
            📧
          </span>
          <div style={{ flex: 1 }}>
            <Text style={{ 
              ...AppTypography.bodyMedium,
              color: AppColors.textSecondary,
              margin: 0,
            }}>
              Email
            </Text>
            <Text style={{ margin: 0 }}>
              {user.email || 'Не указан'}
            </Text>
          </div>
        </div>
      </div>
    </Div>
  );
};