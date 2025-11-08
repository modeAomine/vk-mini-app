import { Panel, Button, Group, Header, Div, Avatar, Title, Text } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

interface HomeProps {
  id: string;
  fetchedUser?: UserInfo;
  onNavigate: (panel: string) => void;
}

const Home = ({ id, fetchedUser, onNavigate }: HomeProps) => {
  return (
    <Panel id={id}>
      <Group>
        <Div>
          <Title level="1" style={{ marginBottom: 16 }}>
            🎉 Добро пожаловать!
          </Title>
          
          {fetchedUser ? (
            <div style={{ 
              background: 'var(--background_content)', 
              padding: 16, 
              borderRadius: 12,
              marginBottom: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Avatar 
                  src={fetchedUser.photo_200} 
                  size={64}
                />
                <div>
                  <Title level="2">
                    {fetchedUser.first_name} {fetchedUser.last_name}
                  </Title>
                  <Text style={{ color: 'var(--text_secondary)' }}>
                    ID: {fetchedUser.id}
                  </Text>
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: 12 
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Text weight="2">Имя</Text>
                  <Title level="3">{fetchedUser.first_name}</Title>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text weight="2">Фамилия</Text>
                  <Title level="3">{fetchedUser.last_name}</Title>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text weight="2">ID</Text>
                  <Title level="3">{fetchedUser.id}</Title>
                </div>
              </div>
            </div>
          ) : (
            <Div>
              <Text>Загрузка данных пользователя...</Text>
            </Div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button 
              size="l" 
              onClick={() => onNavigate('persik')}
              stretched
            >
              📱 Перейти к Персику
            </Button>
            
            {fetchedUser && (
              <Button 
                size="l" 
                mode="secondary"
                onClick={() => {
                  // Дополнительные действия с пользователем
                  console.log('User data:', fetchedUser);
                }}
                stretched
              >
                ℹ️ Показать данные в консоли
              </Button>
            )}
          </div>
        </Div>
      </Group>

      {/* Дополнительная информация */}
      {fetchedUser && (
        <Group header={<Header>📊 Статистика</Header>}>
          <Div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text>Профиль загружен</Text>
              <Text weight="2" style={{ color: 'var(--accent)' }}>
                ✅ Успешно
              </Text>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8
            }}>
              <Text>Аватарка</Text>
              <Text weight="2" style={{ color: 'var(--accent)' }}>
                {fetchedUser.photo_100 ? '✅' : '❌'}
              </Text>
            </div>
          </Div>
        </Group>
      )}
    </Panel>
  );
};

export default Home;