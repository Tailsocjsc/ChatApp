/* eslint-disable prettier/prettier */

import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { images } from '../utils/images';
import { hp } from '../utils/scale';
import colors from '../utils/theme/colors';

const SearchBar = ({ icon, placeHolder = 'Search', onChange }) => {
  return (
    <TextInput
      onChangeText={onChange}
      placeholderTextColor={colors.placeholder}
      placeholder={placeHolder}
      style={styles.mainView}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  mainView: {
    height: hp(45),
    borderRadius: 30,
    borderColor: colors.placeholder,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingLeft: 18,
    paddingRight: 18,
  },
  iconView: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
});
