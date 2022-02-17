import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/navigations/StackNavigator';
import FlashMessage from 'react-native-flash-message';
import NotificationPopup from './src/widget/NotificationPopup';

const store = configureStore();

/**
 * Outside the component
 * set initial config before even rendering once
 */

const App = () => {
  // const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* {isOffline && <NoInternetModal show={isOffline} />} */}
        <MainStackNavigator />
      </NavigationContainer>
      <NotificationPopup />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
