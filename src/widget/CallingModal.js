/* eslint-disable prettier/prettier */

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../utils/theme/colors';
import { fontFamilySemiBold } from '../utils/theme/font';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/utils';
import RoundAvatar from './RoundAvatar';
import { images } from '../utils/images';
const CallingModal = ({
  visible,
  onClose,
  name,
  calcelCall,
  goBack,
  profile_url,
  reCall,
}) => {
  const { call_status } = useSelector((state) => state.common);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.mainView}>
        <RoundAvatar
          image_url={profile_url}
          size={70}
          latter={name ? name[0] : '#'}
        />
        {call_status === 'reject' ? (
          <View style={{ marginTop: 12 }}>
            <Text
              style={styles.callingText}
            >{`${name} is not answering...`}</Text>
            <View style={{ height: 12 }} />
            <View style={styles.buttonActionRow}>
              <TouchableOpacity
                onPress={() => goBack()}
                style={styles.buttonView}
              >
                <Image style={styles.actionIcon} source={images.cancel} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => reCall()}
                style={[styles.buttonView, { backgroundColor: colors.primary }]}
              >
                <Image style={styles.actionIcon} source={images.video} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.callingText}>{`Calling to ${name}...`}</Text>
            <TouchableOpacity
              onPress={() => calcelCall()}
              style={styles.cancelCallButton}
            >
              <Image
                source={images.endCall}
                style={{ height: 22, width: 22, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CallingModal;

const styles = StyleSheet.create({
  mainView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  imageView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: 'contain',
  },
  callingText: {
    fontFamily: fontFamilySemiBold,
    fontSize: 18,
    color: colors.white,
  },
  cancelCallButton: {
    height: 58,
    width: 58,
    backgroundColor: colors.redAction,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  bakeButton: {
    padding: 8,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActionRow: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonView: {
    backgroundColor: colors.white,
    height: 48,
    width: 48,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
  },
  actionIcon: {
    height: 22,
    width: 22,
    tintColor: 'black',
  },
});
