import React from 'react';
import { Button, Card, Div, Title, Text, Spinner } from '@vkontakte/vkui';
import { useUser } from '../hooks/useUser';

const VKAuth: React.FC = () => {
  const { user, loading, error, authWithVK, logout } = useUser();

  const handleAuth = async () => {
    try {
      await authWithVK();
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  if (loading) {
    return (
      <Div>
        <Spinner size="xl" />
        <Text>Загрузка...</Text>
      </Div>
    );
  }

  if (error) {
    return (
      <Card>
        <Div>
          <Title level="3" style={{ color: 'red' }}>Ошибка</Title>
          <Text>{error}</Text>
          <Button size="l" onClick={handleAuth} style={{ marginTop: 16 }}>
            Попробовать снова
          </Button>
        </Div>
      </Card>
    );
  }

  if (user) {
    return (
      <Card>
        <Div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img 
              src={user.photo_100} 
              alt={`${user.first_name} ${user.last_name}`}
              style={{ width: 64, height: 64, borderRadius: '50%' }}
            />
            <div>
              <Title level="3">
                {user.first_name} {user.last_name}
              </Title>
              <Text>ID: {user.vk_id}</Text>
              {/* {user.is_admin && (
                <Text style={{ color: 'var(--accent)' }}>Администратор</Text>
              )} */}
            </div>
          </div>
          <Button 
            size="l" 
            mode="secondary" 
            onClick={logout}
            style={{ marginTop: 16 }}
          >
            Выйти
          </Button>
        </Div>
      </Card>
    );
  }

  return (
    <Card>
      <Div>
        <Title level="2">Вход в приложение</Title>
        <Text>Для начала работы необходимо авторизоваться через VK</Text>
        <Button 
          size="l" 
          onClick={handleAuth}
          style={{ marginTop: 16 }}
          disabled={loading}
        >
          Войти через VK
        </Button>
      </Div>
    </Card>
  );
};

export default VKAuth;