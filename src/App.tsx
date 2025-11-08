import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';

import { Persik, Home } from './panels';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  useEffect(() => {
    async function initApp() {
      try {
        await bridge.send('VKWebAppInit');
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        setPopout(null);
      } catch (error) {
        console.error('Failed to initialize:', error);
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
          <Home 
            id="home" 
            fetchedUser={fetchedUser}
            onNavigate={handleNavigation} 
          />
          <Persik 
            id="persik" 
            onNavigate={handleNavigation}
          />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

export default App;