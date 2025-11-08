import { Avatar, Title, Text, Div } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

interface UserProfileProps {
  user: UserInfo;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <Avatar 
          src={user.photo_200} 
          size={72}
        />
        <div>
          <Title level="1">
            {user.first_name} {user.last_name}
          </Title>
          <Text style={{ color: 'var(--text_secondary)' }}>
            Пользователь ВКонтакте
          </Text>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: 16,
        background: 'var(--background_content)',
        padding: 16,
        borderRadius: 12
      }}>
        <div style={{ textAlign: 'center' }}>
          <Text weight="3">ID</Text>
          <Title level="3" style={{ color: 'var(--accent)' }}>
            #{user.id}
          </Title>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Text weight="3">Имя</Text>
          <Title level="3">{user.first_name}</Title>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Text weight="3">Фамилия</Text>
          <Title level="3">{user.last_name}</Title>
        </div>
      </div>
    </Div>
  );
};