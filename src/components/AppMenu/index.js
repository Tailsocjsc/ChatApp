import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { images } from '../../utils/images';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppMenu = ({ show, hideMenu, menuIcon }) => {
  const navigation = useNavigation();
  return (
    <Menu anchor={menuIcon} visible={show} onRequestClose={hideMenu}>
      <MenuItem
        onPress={() => {
          AsyncStorage.clear();
          navigation.navigate('SplashScreen');
          hideMenu();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
};

export default AppMenu;
