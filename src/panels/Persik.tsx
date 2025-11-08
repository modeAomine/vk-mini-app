import { Panel, Button } from '@vkontakte/vkui';

interface PersikProps {
  id: string;
  onNavigate?: (panel: string) => void;
}

const Persik = ({ id, onNavigate }: PersikProps) => {
  return (
    <Panel id={id}>
      <div style={{ padding: 20 }}>
        <h1>Персик</h1>
        <p>Это страница Персика 🍑</p>
        <Button 
          size="l" 
          onClick={() => onNavigate?.('home')}
        >
          Назад
        </Button>
      </div>
    </Panel>
  );
};

export default Persik;