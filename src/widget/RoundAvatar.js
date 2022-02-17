/* eslint-disable prettier/prettier */

import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { hp, wp } from '../utils/scale';
import colors from '../utils/theme/colors';

const RoundAvatar = ({ latter, size = 45, image_url }) => {
  return (
    <Image
      source={{ uri: image_url }}
      style={[
        styles.avtarView,
        { height: size, width: size, borderRadius: size },
      ]}
    />
  );
};

export default RoundAvatar;

const styles = StyleSheet.create({
  avtarView: {
    height: hp(45),
    width: wp(45),
    borderRadius: 45,
    backgroundColor: colors.secondary,
    borderWidth: 1.5,
    borderColor: colors.textGrey,
  },
  avtarText: {
    fontSize: 22,
    color: colors.white,
  },
});
