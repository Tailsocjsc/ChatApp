/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import colors from '../utils/theme/colors';
import {
  fontFamily,
  fontFamilyBold,
  fontFamilySemiBold,
} from '../utils/theme/font';
import RoundAvatar from './RoundAvatar';
import Video from 'react-native-video';
import moment from 'moment';
import { SCREEN_WIDTH } from '../utils/utils';
import { images } from '../utils/images';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import AppMenu from '../components/AppMenu';

const HeaderComponent = ({}) => {
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  console.log('userInfo', userInfo);
  return (
    <View style={styles.mainView}>
      <View style={styles.subRow}>
        <RoundAvatar size={42} image_url={userInfo?.profile_url} />
        <View style={{ width: 18 }} />

        <Text style={styles.nameText}>{userInfo?.name}</Text>
      </View>
      <View style={styles.subRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('UserListScreen')}
          style={styles.addView}
        >
          <Image source={images.plus} style={[styles.addIcon]} />
        </TouchableOpacity>
        <View>
          <AppMenu
            show={showMenu}
            hideMenu={() => setShowMenu(false)}
            menuIcon={
              <TouchableOpacity onPress={() => setShowMenu(true)}>
                <Image
                  source={images.menu}
                  style={[styles.backIcon, { marginLeft: 12 }]}
                />
              </TouchableOpacity>
            }
          ></AppMenu>
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: 22,
    width: 8,
    tintColor: colors.white,
  },
  nameText: {
    fontFamily: fontFamilyBold,
    fontSize: 22,
    color: colors.white,
  },
  addView: {
    height: 32,
    width: 32,
    backgroundColor: colors.redAction,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  addIcon: {
    height: 18,
    width: 18,
    alignSelf: 'center',
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});
