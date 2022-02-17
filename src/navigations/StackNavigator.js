/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import UserListScreen from '../screens/UserList/UserList';
import Chat from '../screens/Chat';
import Conference from '../screens/Conference/Conference';
import SplashScreen from '../screens/Splash/SplashScreen';

const Stack = createStackNavigator();

const screenOptionsStyle = {
  headerTitleAlign: 'center',
  headerTitleStyle: { fontSize: 18, fontWeight: '100' },
  headerLeft: null,
};

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={screenOptionsStyle}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Conference"
        component={Conference}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
