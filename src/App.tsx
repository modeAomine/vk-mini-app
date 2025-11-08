import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';

import Home from './panels/Home';

const App = () => {
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  useEffect(() => {
    async function initApp() {
      try {
        // Инициализируем VK Mini App
        await bridge.send('VKWebAppInit');
        console.log('✅ VK Mini App initialized');
        
        // Получаем данные пользователя
        const user = await bridge.send('VKWebAppGetUserInfo');
        console.log('✅ User data loaded:', user);
        setUser(user);
        
        setPopout(null);
      } catch (error) {
        console.error('❌ Failed to initialize:', error);
        setPopout(null);
      }
    }
    initApp();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel="home">
          <Home id="home" fetchedUser={fetchedUser} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

export default App;