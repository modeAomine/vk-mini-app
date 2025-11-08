import { useState, useEffect, ReactNode } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';

import { Persik, Home } from './panels';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  useEffect(() => {
    async function initApp() {
      try {
        await bridge.send('VKWebAppInit');
        setPopout(null);
      } catch (error) {
        console.error('Failed to initialize VK app:', error);
        setPopout(null);
      }
    }
    initApp();
  }, []);

  const handleNavigation = (panel: string) => {
    setActivePanel(panel);
  };

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" onNavigate={handleNavigation} />
          <Persik id="persik" onNavigate={handleNavigation} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

export default App;