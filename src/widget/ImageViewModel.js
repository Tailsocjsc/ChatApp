/* eslint-disable prettier/prettier */

import React from 'react';
import { View, StyleSheet, Image, Modal } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/utils';

const ImageViewModel = ({ visible, onClose, url }) => {
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
        <Image style={styles.imageView} source={{ uri: url }} />
      </View>
    </Modal>
  );
};

export default ImageViewModel;

const styles = StyleSheet.create({
  mainView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'black',
  },
  imageView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: 'contain',
  },
});
