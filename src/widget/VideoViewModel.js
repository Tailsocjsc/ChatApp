/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/utils';
import Video from 'react-native-video';
import { images } from '../utils/images';
import colors from '../utils/theme/colors';

const VideoViewModel = ({ visible, onClose, url }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [visible]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setIsPlaying(!isPlaying)}
        style={styles.mainView}
      >
        <Video
          source={{
            uri: url,
          }} // Can be a URL or a local file.
          paused={!isPlaying}
          resizeMode="contain"
          repeat={true}
          style={styles.imageView}
          controls={true}
        />
        {!isPlaying && (
          <View style={styles.overPlayButtonView}>
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => setIsPlaying(!isPlaying)}
            >
              <Image style={styles.playButton} source={images.play} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default VideoViewModel;

const styles = StyleSheet.create({
  mainView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'black',
  },
  imageView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overPlayButtonView: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    zIndex: 99999,
    position: 'absolute',
    backgroundColor: colors.blackO50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    height: 46,
    width: 46,
    resizeMode: 'contain',
  },
});
