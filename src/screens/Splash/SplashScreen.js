/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import { View, DeviceEventEmitter, Image, Text } from 'react-native';
import colors from '../../utils/theme/colors';
import { sendPushNotification } from '../../utils/utils';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';
import { useEffect } from 'react';
import {
  hideNotification,
  showNotification,
} from '../../store/actions/NotificationActions';
import IncomingCall from 'react-native-incoming-call';
import {
  setCallStatus,
  setOppFamAction,
} from '../../store/actions/CommonActions';
import { images } from '../../utils/images';
import { setUserData } from '../../store/actions/LoginActions';

// import admin from 'firebase-admin';

let gOppFcm = '';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const forgroundNotificationHandle = async (notification) => {
    Sound.setCategory('Playback');
    var mySound = new Sound(
      'notification_android.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          return;
        } else {
          mySound.play((success) => {
            if (success) {
            } else {
            }
          });
        }
      }
    );
    mySound.setVolume(0.9);
    mySound.release();
    dispatch(showNotification(notification));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };

  const incommingCallHandal = (notification) => {
    gOppFcm = notification?.data?.oppFcm;
    dispatch(setOppFamAction(notification?.data?.oppFcm));
    IncomingCall.display(
      notification?.data?.channelId + ',' + notification?.data?.oppFcm, // Call UUID v4
      notification?.title, // Username
      notification?.data?.oppProfile, // Avatar URL
      'Incomming Call', // Info text
      20000 // Timeout for end call after 20s
    );
  };

  const handleCallStatus = (notification) => {
    dispatch(setCallStatus(notification?.data?.status));
  };

  const sendCallStatusNotification = (status, fcm) => {
    const messageContaint = {
      to: fcm,
      notification: { title: 'Call', body: 'Call Status' },
      data: {
        type: 'call_status',
        status: status,
      },
    };
    sendPushNotification(messageContaint);
  };

  const pushController = () => {
    PushNotification.configure({
      onRegister: function (token) {
        AsyncStorage.setItem('FCMToken', JSON.stringify(token));
      },
      onNotification: function (notification) {
        if (notification?.data?.type === 'incomming_call') {
          incommingCallHandal(notification);
        } else if (notification?.data?.type === 'call_status') {
          handleCallStatus(notification);
        } else {
          if (notification.foreground) {
            if (notification?.data?.type === 'miss_call') {
              IncomingCall.dismiss();
            }
            forgroundNotificationHandle(notification);
          } else {
          }
        }
      },
      senderID: '747808185103',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  const callHandler = async () => {
    /**
     * App open from killed state (headless mode)
     */
    const payload = await IncomingCall.getExtrasFromHeadlessMode();
    if (payload) {
      // Start call action here. You probably want to navigate to some CallRoom screen with the payload.uuid.
    }

    /**
     * App in foreground / background: listen to call events and determine what to do next
     */
    DeviceEventEmitter.addListener('endCall', (payload) => {
      let fcm = payload?.uuid?.split(',')[1];
      sendCallStatusNotification('reject', fcm);
      // End call action here
    });
    DeviceEventEmitter.addListener('answerCall', (payload) => {
      let channelId = payload?.uuid.split(',')[0];
      let fcm = payload?.uuid?.split(',')[1];
      navigation.navigate('Conference', {
        channel: channelId,
        isJoiner: true,
      });
      sendCallStatusNotification('answer', fcm);
    });
  };

  const initData = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('userInfo'));
    console.log('get user here==', user);
    setTimeout(() => {
      if (user) {
        dispatch(setUserData(user));
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }
    }, 2000);
  };

  useEffect(() => {
    pushController();
    callHandler();
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={images.splash} />
      <Text style={styles.welcomeText}>Welcome To Chat</Text>
    </View>
  );
};

export default SplashScreen;
