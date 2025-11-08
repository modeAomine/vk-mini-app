import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, ScreenSpinner } from '@vkontakte/vkui';
import { MainMenu } from './screens/MainMenu';
import { ProfileScreen } from './screens/ProfileScreen';
import { useAuth } from './hooks/useAuth';
import { NavigationProps } from './types';

type NavigationComponent = React.FC<NavigationProps>;

const App: React.FC = () => {
  const { loading, login } = useAuth();
  const [activePanel, setActivePanel] = useState<string>('main');
  const [CurrentComponent, setCurrentComponent] = useState<NavigationComponent | null>(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        await bridge.send('VKWebAppInit');
        await login();
      } catch (error) {
        console.error('App initialization failed:', error);
      }
    };

    initApp();
  }, [login]);

  const handleNavigation: NavigationProps['onNavigate'] = (componentOrPanel) => {
    if (typeof componentOrPanel === 'string') {
      setActivePanel(componentOrPanel);
      setCurrentComponent(null);
    } else {
      setActivePanel('dynamic');
      setCurrentComponent(() => componentOrPanel);
    }
  };

  if (loading) {
    return (
      <View activePanel="loading">
        <Panel id="loading">
          <ScreenSpinner />
        </Panel>
      </View>
    );
  }

  return (
    <View activePanel={activePanel}>
      <Panel id="main">
        <MainMenu onNavigate={handleNavigation} />
      </Panel>
      
      {/* Статические экраны */}
      <Panel id="profile">
        <ProfileScreen onNavigate={handleNavigation} />
      </Panel>
      
      {/* Динамический экран для компонентов */}
      <Panel id="dynamic">
        {CurrentComponent && <CurrentComponent onNavigate={handleNavigation} />}
      </Panel>
    </View>
  );
};

export default App;