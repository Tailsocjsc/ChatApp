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
    >
      <View style={styles.containtView}>
        <View style={styles.ballIconView}>
          <Image style={styles.ballIcon} source={images.bell} />
        </View>
        <View style={{ marginLeft: 12, marginRight: 22 }}>
          <Text style={styles.title}>{activeNotification?.title}</Text>
          <Text style={styles.descpriction}>{activeNotification?.message}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.cancelButton}>
        <Image style={styles.calcelIcon} source={images.cancel} />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationPopup;

const styles = StyleSheet.create({
  mainView: {
    height: 90,
    elevation: 6,
    alignSelf: 'center',
    width: '90%',
    position: 'absolute',
    top: 0,
    zIndex: 999999,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
  },
  containtView: {
    marginLeft: 28,
    marginRight: 16,
    flexDirection: 'row',
  },
  ballIconView: {
    height: 36,
    width: 36,
    borderRadius: 36,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballIcon: {
    height: 18,
    width: 18,
    tintColor: colors.white,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: fontFamilySemiBold,
    fontSize: 18,
    color: colors.inputGray,
  },
  descpriction: {
    fontFamily: fontFamily,
    fontSize: 12,
    color: colors.inputGray,
    marginTop: 4,
  },
  cancelButton: {
    padding: 4,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  calcelIcon: {
    height: 18,
    width: 18,
    tintColor: colors.gray,
    resizeMode: 'contain',
  },
});
