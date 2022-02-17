/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { images } from '../../utils/images';
import styles from './styles';

const AddFileModel = ({
  show,
  onClose,
  onImageSend,
  onVideoSend,
  onDocumentSend,
}) => (
  <Modal
    onRequestClose={() => {
      onClose();
    }}
    isVisible={show}
    style={styles.modal}
  >
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={() => onImageSend()} style={styles.itemView}>
        <Image source={images.image} style={styles.iconView} />
        <Text style={styles.textView}>Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onVideoSend()} style={styles.itemView}>
        <Image source={images.video} style={styles.iconView} />
        <Text style={styles.textView}>Video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDocumentSend()}
        style={styles.itemView}
      >
        <Image source={images.attachment} style={styles.iconView} />
        <Text style={styles.textView}>File</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default AddFileModel;
