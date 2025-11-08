import { Panel, Button, Group, Header, Div, Title, Text } from '@vkontakte/vkui';

interface PersikProps {
  id: string;
  onNavigate: (panel: string) => void;
}

const Persik = ({ id, onNavigate }: PersikProps) => {
  return (
    <Panel id={id}>
      <Group header={<Header>🍑 Персик</Header>}>
        <Div>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 64 }}>🍑</span>
            <Title level="1" style={{ marginTop: 8 }}>Персик</Title>
            <Text>Это страница Персика! Здесь может быть что-то интересное...</Text>
          </div>
          
          <Button 
            size="l" 
            onClick={() => onNavigate('home')}
            stretched
          >
            ← Назад к профилю
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

export default Persik;