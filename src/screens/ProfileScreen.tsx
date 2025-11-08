import React from 'react';
import { Panel, Button, Div, Text } from '@vkontakte/vkui';
import { BaseScaffold } from '../components/ui/BaseScaffold';
import { UserProfile } from '../components/UserProfile';
import { useUserProfile } from '../hooks/useUserProfile';
import { NavigationProps } from '../types';

export const ProfileScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useUserProfile();

  return (
    <Panel id="profile">
      <BaseScaffold>
        <div style={{ padding: '16px' }}>
          <Button 
            mode="tertiary" 
            onClick={() => onNavigate('main')}
            style={{ marginBottom: '16px' }}
          >
            ← Назад
          </Button>
          
          {user ? (
            <UserProfile user={user} />
          ) : (
            <Div>
              <Text>Загрузка профиля...</Text>
            </Div>
          )}
        </div>
      </BaseScaffold>
    </Panel>
  );
};