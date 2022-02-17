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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Images from '../Image/Index';
import Sizes from '../utils/Sizes';
import { View, Text, Image, TextInput } from 'react-native';
import Setting from '../screens/Setting/Setting';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionsStyle = {
  headerTitleAlign: 'center',
  headerTitleStyle: { fontSize: 18, fontWeight: '100' },
  headerLeft: null,
};
const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        // Floating Tab Bar...
        tabBarStyle: {
          backgroundColor: 'white',
          // position: 'absolute',
          // bottom: Sizes.s80,

          // Max Height...
          height: Sizes.s100,
          borderRadius: Sizes.s20,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: Sizes.s20,
            height: Sizes.s20,
          },
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                resizeMode="contain"
                source={Images.ic_chat}
                style={{
                  width: focused?Sizes.s30 :Sizes.s45 ,
                  height: focused?Sizes.s30 :Sizes.s45 ,
                  tintColor: focused ? '#5DB1E7' : '#A3A4B6',
                }}
              />
              {focused && (
                <Text
                  style={{
                    fontSize: Sizes.h24,
                    width: Sizes.s140,
                    textAlign: 'center',
                    fontWeight: focused ? 'bold' : 'normal',
                    color: focused ? '#5DB1E7' : '#A3A4B6',
                  }}
                >
                  Tin nhắn
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                resizeMode="contain"
                source={Images.ic_user}
                style={{
                  width: focused?Sizes.s30 :Sizes.s45 ,
                  height: focused?Sizes.s30 :Sizes.s45 ,
                  tintColor: focused ? '#5DB1E7' : '#A3A4B6',
                }}
              />
              {focused && (
                <Text
                  style={{
                    fontSize: Sizes.h24,
                    width: Sizes.s140,
                    textAlign: 'center',
                    fontWeight: focused ? 'bold' : 'normal',
                    color: focused ? '#5DB1E7' : '#A3A4B6',
                  }}
                >
                  Cá nhân
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
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
        name="MyTabs"
        component={MyTabs}
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
