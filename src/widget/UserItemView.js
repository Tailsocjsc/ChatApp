/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { images } from '../utils/images';
import colors from '../utils/theme/colors';
import {
  fontFamily,
  fontFamilyBold,
  fontFamilySemiBold,
} from '../utils/theme/font';
import RoundAvatar from './RoundAvatar';

const UserItemView = ({
  name,
  details,
  time,
  unreadMessage,
  onPress,
  hasUnread,
  profileImage,
  isTyping,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      style={styles.mainView}
    >
      <RoundAvatar size={40} image_url={profileImage} />
      <View style={styles.mainRow}>
        <View style={{ marginLeft: 5 }}>
          <Text
            numberOfLines={1}
            style={[
              styles.nameText,
              { fontFamily: hasUnread ? fontFamilyBold : fontFamilySemiBold },
            ]}
          >
            {name}
          </Text>
          {details && !isTyping && (
            <Text
              numberOfLines={1}
              style={[
                styles.detailsText,
                hasUnread && {
                  color: 'black',
                  fontFamily: fontFamilySemiBold,
                },
              ]}
            >
              {details}
            </Text>
          )}
          {isTyping && (
            <Text numberOfLines={1} style={[styles.typingText]}>
              {'Typing...'}
            </Text>
          )}
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text>{time}</Text>
          {hasUnread && (
            <View style={styles.unreadView}>
              <Text style={styles.unreadText}>{unreadMessage}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserItemView;

const styles = StyleSheet.create({
  mainView: {
    // height: 60,
    flexDirection: 'row',
    // marginTop: 12,
    paddingVertical:10,
    justifyContent:"flex-start",
    alignItems:'center'
  },
  mainRow: {
    flexDirection: 'row',
    flex: 1,
    // height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor:"gray",
    borderBottomWidth:0.5,
    marginHorizontal:10,
    paddingVertical:10
  },
  unreadView: {
    height: 22,
    width: 22,
    backgroundColor: colors.primary,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontFamily: fontFamilySemiBold,
    color: 'black',
  },
  detailsText: {
    fontSize: 14,
    fontFamily: fontFamily,
    color: colors.textGrey,
  },
  typingText: {
    fontSize: 14,
    fontFamily: fontFamilySemiBold,
    color: colors.primary,
  },
  unreadText: {
    fontFamily: fontFamily,
    fontSize: 12,
    color: colors.white,
    marginTop: -4,
  },
});
