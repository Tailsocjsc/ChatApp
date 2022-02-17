/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import colors from '../utils/theme/colors';
import { fontFamily, fontFamilySemiBold } from '../utils/theme/font';
import RoundAvatar from './RoundAvatar';
import Video from 'react-native-video';
import moment from 'moment';
import { SCREEN_WIDTH } from '../utils/utils';
import { images } from '../utils/images';
import { useSelector } from 'react-redux';

const MessageItemView = ({
  id,
  message,
  type,
  url,
  isSending,
  onOpenImage,
  onOpenVideo,
  time,
  index,
  unReadMessage,
  isDocument,
  onDownloadFile,
  isDownloading,
  onSelectMessage,
  selectMessageCount,
  isSelected,
  userImageUrl,
  messageData,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const imageLayout = () => {
    return (
      <TouchableOpacity
        onPress={() => onOpenImage(url)}
        style={styles.imageMainView}
      >
        {isSending ? (
          <ActivityIndicator
            size="large"
            style={{ height: 18, width: 18, alignSelf: 'center' }}
            color={colors.white}
          />
        ) : (
          <Image style={styles.imageView} source={{ uri: url }} />
        )}
      </TouchableOpacity>
    );
  };

  const videoLayout = () => {
    return (
      <TouchableOpacity
        onPress={() => onOpenVideo(url)}
        style={styles.imageMainView}
      >
        {isSending ? (
          <ActivityIndicator
            size="large"
            style={{ height: 18, width: 18, alignSelf: 'center' }}
            color={colors.white}
          />
        ) : (
          <Video
            source={{
              uri: url,
            }} // Can be a URL or a local file.
            paused={true}
            resizeMode="contain"
            repeat={true}
            style={styles.imageMainView}
          />
        )}
      </TouchableOpacity>
    );
  };

  const documentLayout = () => {
    return (
      <TouchableOpacity
        onPress={() => onDownloadFile(url)}
        style={styles.documentView}
      >
        <View style={styles.insideView}>
          <Image style={styles.pdfImage} source={images.pdf} />
          <Text>{message}</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.extentionText}>{type}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.extentionText}>
              {moment(time).format('HH:mm')}
            </Text>
            {id === userInfo?._id && (
              <View>
                {unReadMessage !== 0 && unReadMessage > index ? (
                  <Image
                    style={[styles.checkIcon, { tintColor: colors.white }]}
                    source={images.check}
                  />
                ) : (
                  <Image
                    style={[styles.checkIcon, { height: 14, width: 14 }]}
                    source={images.doubleCheck}
                  />
                )}
              </View>
            )}
            {isDownloading && (
              <ActivityIndicator
                size="small"
                style={{ height: 18, width: 18, alignSelf: 'center' }}
                color={colors.primary}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const messageLayout = () => {
    return (
      <View
        style={[
          styles.messageView,
          {
            backgroundColor:
              id === userInfo?._id ? colors.primary : colors.white,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: id === userInfo?._id ? colors.white : 'black' },
          ]}
        >
          {message}
        </Text>
        <View style={styles.messageTime}>
          {id === userInfo?._id && (
            <View>
              {unReadMessage !== 0 && unReadMessage > index ? (
                <Image
                  style={[styles.checkIcon, { tintColor: colors.white }]}
                  source={images.check}
                />
              ) : (
                <Image
                  style={[styles.checkIcon, { height: 14, width: 14 }]}
                  source={images.doubleCheck}
                />
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  const getMessageLayout = (layoutType) => {
    switch (layoutType) {
      case 'image/jpeg':
        return imageLayout();
      case 'video/webm':
      case 'video/mp4':
        return videoLayout();

      default:
        if (isDocument) {
          return documentLayout();
        } else {
          return messageLayout();
        }
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (selectMessageCount !== 0) {
          onSelectMessage(index);
        }
      }}
      onLongPress={() => {
        onSelectMessage(index);
      }}
      style={{
        width: '100%',
        backgroundColor: isSelected ? 'rgba(0,0,0,0.1)' : 'transparent',
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={[
          styles.mainRow,
          { justifyContent: id === userInfo?._id ? 'flex-end' : 'flex-start' },
        ]}
      >
        {id !== userInfo?._id && (
          <RoundAvatar size={30} image_url={userImageUrl} />
        )}
        <View style={{ marginLeft: 8 }} />
        <View style={{ maxWidth: '70%' }}>
          <Text
            style={[
              styles.nameTextStyle,
              id === userInfo?._id && { textAlign: 'right' },
            ]}
          >
            {`${messageData?.user?.name}, ${moment(time).format('HH:mm')}`}
          </Text>
          {getMessageLayout(type)}
        </View>
        <View style={{ marginLeft: 8 }} />
        {id === userInfo?._id && (
          <RoundAvatar size={30} image_url={userImageUrl} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MessageItemView;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginTop: 4,
  },
  containtView: {
    flexDirection: 'row',
  },
  iconView: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  lableText: {
    fontFamily: fontFamilySemiBold,
    fontSize: 16,
    color: 'black',
  },
  rowView: {
    marginLeft: 12,
  },
  mainRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 6,
  },
  tileText: {
    color: colors.inputGray,
    fontFamily: fontFamily,
    fontSize: 14,
    marginTop: 2,
  },
  timeText: {
    fontFamily: fontFamily,
    fontSize: 12,
    color: colors.inputGrayO50,
    marginLeft: 12,
  },
  imageView: {
    height: 170,
    resizeMode: 'contain',
    width: 140,
  },
  imageMainView: {
    height: 170,
    backgroundColor: 'black',
    borderRadius: 12,
    width: 140,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeRow: {
    height: 1,
    width: '100%',
    backgroundColor: colors.inputGrayO50,
    marginTop: 12,
  },
  timeView: {
    // padding: 4,
    alignContent: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadView: {
    position: 'absolute',
    bottom: 0,
    right: 18,
    height: 12,
    width: 12,
    borderRadius: 12,
    elevation: 5,
  },
  downloadIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },

  postView: {
    // height: 270,
    marginTop: 12,
    width: SCREEN_WIDTH / 1.7,
    borderColor: colors.inputGrayO50,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userJobTitleText: {
    fontFamily: fontFamily,
    fontSize: 12,
  },
  usernameText: {
    fontSize: 14,
    fontFamily: fontFamilySemiBold,
  },

  messageView: {
    // padding: 8,
    marginTop: 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 8,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  messageText: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.white,
    marginRight: 18,
  },
  messageTime: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 10,
    color: colors.white,
  },
  checkIcon: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
    marginLeft: 6,
  },
  insideView: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  documentView: {
    backgroundColor: colors.gray,
    padding: 8,
    borderRadius: 12,
    width: SCREEN_WIDTH / 1.5,
    marginTop: 4,
    alignItems: 'center',
  },
  bottomRow: {
    height: 18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 4,
  },
  pdfImage: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
    marginRight: 6,
  },
  extentionText: {
    fontSize: 12,
  },

  nameTextStyle: {
    fontFamily: fontFamilySemiBold,
    fontSize: 10,
    color: 'black',
  },
});
