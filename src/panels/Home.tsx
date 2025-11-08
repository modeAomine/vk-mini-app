import { Panel, Group, Header, Div, Avatar, Title, Button, Card } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

interface HomeProps {
  id: string;
  fetchedUser?: UserInfo;
}

interface LaunchParams {
  vk_user_id: number;
  vk_app_id: number;
  vk_platform: string;
  vk_language: string;
  vk_ref: string;
  sign: string;
}

const Home = ({ id, fetchedUser }: HomeProps) => {
  const [launchParams, setLaunchParams] = useState<LaunchParams | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Получаем дополнительные данные
  useEffect(() => {
    const getAdditionalData = async () => {
      try {
        // Получаем параметры запуска
        const params = await bridge.send('VKWebAppGetLaunchParams');
        setLaunchParams(params as LaunchParams);
        
        // Пробуем получить токен
        const tokenData = await bridge.send('VKWebAppGetAuthToken', {
          app_id: params.vk_app_id,
          scope: 'friends,photos'
        });
        setToken(tokenData.access_token);
      } catch (error) {
        console.log('Some data not available:', error);
      }
    };

    if (fetchedUser) {
      getAdditionalData();
    }
  }, [fetchedUser]);

  const refreshUserData = async () => {
    try {
      const user = await bridge.send('VKWebAppGetUserInfo');
      console.log('Refreshed user data:', user);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  return (
    <Panel id={id}>
      {/* Заголовок */}
      <Group>
        <Div>
          <Title level="1" style={{ textAlign: 'center', marginBottom: 8 }}>
            🎉 Добро пожаловать!
          </Title>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text_secondary)',
            margin: 0 
          }}>
            Ваше VK Mini App успешно работает
          </p>
        </Div>
      </Group>

      {/* Карточка пользователя */}
      {fetchedUser && (
        <Group header={<Header>👤 Профиль пользователя</Header>}>
          <Card>
            <Div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 16, 
                marginBottom: 20 
              }}>
                <Avatar 
                  src={fetchedUser.photo_200} 
                  size={80}
                />
                <div style={{ flex: 1 }}>
                  <Title level="2" style={{ margin: 0 }}>
                    {fetchedUser.first_name} {fetchedUser.last_name}
                  </Title>
                  <p style={{ 
                    color: 'var(--text_secondary)', 
                    margin: '4px 0 0 0' 
                  }}>
                    ID: {fetchedUser.id}
                  </p>
                </div>
              </div>

              {/* Детальная информация */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: 16,
                background: 'var(--background_secondary)',
                padding: 16,
                borderRadius: 8
              }}>
                <div>
                  <p style={{ 
                    fontWeight: 'bold', 
                    margin: '0 0 4px 0',
                    fontSize: 14
                  }}>
                    Имя
                  </p>
                  <p style={{ margin: 0 }}>{fetchedUser.first_name}</p>
                </div>
                <div>
                  <p style={{ 
                    fontWeight: 'bold', 
                    margin: '0 0 4px 0',
                    fontSize: 14
                  }}>
                    Фамилия
                  </p>
                  <p style={{ margin: 0 }}>{fetchedUser.last_name}</p>
                </div>
                <div>
                  <p style={{ 
                    fontWeight: 'bold', 
                    margin: '0 0 4px 0',
                    fontSize: 14
                  }}>
                    VK ID
                  </p>
                  <p style={{ margin: 0 }}>{fetchedUser.id}</p>
                </div>
                <div>
                  <p style={{ 
                    fontWeight: 'bold', 
                    margin: '0 0 4px 0',
                    fontSize: 14
                  }}>
                    Аватар
                  </p>
                  <p style={{ margin: 0 }}>
                    {fetchedUser.photo_100 ? '✅ Есть' : '❌ Нет'}
                  </p>
                </div>
              </div>
            </Div>
          </Card>
        </Group>
      )}

      {/* Информация о запуске */}
      {launchParams && (
        <Group header={<Header>⚙️ Параметры запуска</Header>}>
          <Card>
            <Div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>App ID</span>
                  <strong>{launchParams.vk_app_id}</strong>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Платформа</span>
                  <strong>{launchParams.vk_platform}</strong>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Язык</span>
                  <strong>{launchParams.vk_language}</strong>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Источник</span>
                  <strong>{launchParams.vk_ref}</strong>
                </div>
              </div>
            </Div>
          </Card>
        </Group>
      )}

      {/* Действия */}
      <Group>
        <Div>
          <Button 
            size="l" 
            stretched 
            onClick={refreshUserData}
            style={{ marginBottom: 12 }}
          >
            🔄 Обновить данные
          </Button>
          
          <Button 
            size="l" 
            mode="secondary" 
            stretched
            onClick={() => {
              console.log('User data:', fetchedUser);
              console.log('Launch params:', launchParams);
              console.log('Token:', token);
            }}
          >
            📊 Показать данные в консоли
          </Button>
        </Div>
      </Group>

      {/* Статус */}
      <Group header={<Header>📈 Статус</Header>}>
        <Card>
          <Div>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Пользователь</span>
                <span style={{ 
                  color: fetchedUser ? 'var(--dynamic_green)' : 'var(--dynamic_red)',
                  fontWeight: 'bold'
                }}>
                  {fetchedUser ? '✅ Загружен' : '❌ Ошибка'}
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Параметры запуска</span>
                <span style={{ 
                  color: launchParams ? 'var(--dynamic_green)' : 'var(--dynamic_orange)',
                  fontWeight: 'bold'
                }}>
                  {launchParams ? '✅ Загружены' : '⏳ Загрузка...'}
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Токен доступа</span>
                <span style={{ 
                  color: token ? 'var(--dynamic_green)' : 'var(--dynamic_red)',
                  fontWeight: 'bold'
                }}>
                  {token ? '✅ Получен' : '❌ Не получен'}
                </span>
              </div>
            </div>
          </Div>
        </Card>
      </Group>
    </Panel>
  );
};

export default Home;