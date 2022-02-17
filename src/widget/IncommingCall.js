/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { images } from '../utils/images';
import { hp } from '../utils/scale';
import colors from '../utils/theme/colors';
import { fontFamily, fontFamilySemiBold } from '../utils/theme/font';

const NotificationPopup = () => {
  const { activeNotification } = useSelector((state) => state.notification);
  return (
    <View
      style={[
        styles.mainView,
        { display: activeNotification ? 'flex' : 'none' },
      ]}
    ></View>
  );
};

export default NotificationPopup;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.primary,
  },
});
