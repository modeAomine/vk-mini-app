import { Panel, Button, Group, Header } from '@vkontakte/vkui';
import VKAuth from '../components/VKAuth';

interface HomeProps {
  id: string;
  onNavigate: (panel: string) => void;
}

const Home = ({ id, onNavigate }: HomeProps) => {
  return (
    <Panel id={id}>
      <Group header={<Header>Главная</Header>}>
        <div style={{ padding: 16 }}>
          <VKAuth />
          
          <Button 
            size="l" 
            mode="secondary"
            onClick={() => onNavigate('persik')}
            style={{ marginTop: 16 }}
          >
            Перейти к Персику
          </Button>
        </div>
      </Group>
    </Panel>
  );
};

export default Home;