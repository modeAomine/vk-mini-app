import React, { useState } from 'react';
import { Div, Title, Text, Button, Input } from '@vkontakte/vkui';
import { AppColors } from '../../theme/colors';
import { AppTypography } from '../../theme/typography';
import { Address } from '../../types';

interface AddressesSectionProps {
  addresses: Address[];
  onAddAddress: (title: string, addressText: string) => Promise<boolean>;
  onDeleteAddress: (addressId: number) => Promise<boolean>;
  loading: boolean;
}

export const AddressesSection: React.FC<AddressesSectionProps> = ({
  addresses,
  onAddAddress,
  onDeleteAddress,
  loading,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [addressText, setAddressText] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAddAddress = async () => {
    if (!title.trim() || !addressText.trim()) return;

    setAdding(true);
    const success = await onAddAddress(title.trim(), addressText.trim());
    setAdding(false);

    if (success) {
      setTitle('');
      setAddressText('');
      setShowAddForm(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот адрес?')) {
      await onDeleteAddress(addressId);
    }
  };

  return (
    <Div style={{
      backgroundColor: AppColors.surface,
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      {/* Заголовок */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
      }}>
        <span style={{ fontSize: '20px', color: AppColors.primary }}>📍</span>
        <Title level="2" style={{ margin: 0 }}>
          Мои адреса
        </Title>
      </div>

      {/* Список адресов */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text>Загрузка адресов...</Text>
        </div>
      ) : addresses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: AppColors.background,
          borderRadius: '12px',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '40px', color: AppColors.secondary }}>🏠</span>
          <Text style={{ 
            ...AppTypography.bodyMedium,
            color: AppColors.textSecondary,
            margin: '12px 0 8px 0',
          }}>
            Адреса не добавлены
          </Text>
          <Text style={{ 
            ...AppTypography.bodySmall,
            color: AppColors.textSecondary,
          }}>
            Добавьте адрес для заказа вывоза мусора
          </Text>
        </div>
      ) : (
        <div style={{ marginBottom: '16px' }}>
          {addresses.map((address) => (
            <div
              key={address.id}
              style={{
                backgroundColor: AppColors.background,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
                border: `1px solid ${AppColors.outline}`,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}>
                <span style={{ color: AppColors.primary, fontSize: '16px' }}>🏠</span>
                <div style={{ flex: 1 }}>
                  <Text style={{ 
                    ...AppTypography.bodyLarge,
                    fontWeight: 600,
                    margin: '0 0 4px 0',
                  }}>
                    {address.title}
                  </Text>
                  <Text style={{ margin: 0 }}>
                    {address.address_text}
                  </Text>
                </div>
                <Button
                  mode="tertiary"
                  size="s"
                  onClick={() => address.id && handleDeleteAddress(address.id)}
                  style={{ color: AppColors.error }}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Форма добавления адреса */}
      {showAddForm ? (
        <div style={{
          backgroundColor: AppColors.background,
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название адреса (например: Дом, Работа)"
            style={{ marginBottom: '12px' }}
          />
          <Input
            value={addressText}
            onChange={(e) => setAddressText(e.target.value)}
            placeholder="Полный адрес"
            style={{ marginBottom: '12px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              size="m"
              loading={adding}
              onClick={handleAddAddress}
              disabled={!title.trim() || !addressText.trim()}
            >
              Добавить
            </Button>
            <Button 
              size="m"
              mode="secondary"
              onClick={() => setShowAddForm(false)}
            >
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          size="l"
          stretched
          onClick={() => setShowAddForm(true)}
          style={{
            backgroundColor: AppColors.primary,
            color: AppColors.onPrimary,
          }}
        >
          + Добавить адрес
        </Button>
      )}
    </Div>
  );
};