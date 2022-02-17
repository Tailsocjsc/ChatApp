import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import CallingModal from '../../widget/CallingModal';
import { DUMMY_AVTAR, sendPushNotification } from '../../utils/utils';
import { call } from 'react-native-reanimated';
import { setCallStatus } from '../../store/actions/CommonActions';

const APP_ID = 'e70b163a120b45ffb68dd4ee9e5484a9';

export default function Conference(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { call_status } = useSelector((state) => state.common);
  const [sessionInfo, setSessionInfo] = useState();
  const [isJoinUser, setIsJoinUser] = useState(false);
  const [oppUser, setOppUser] = useState();
  const [isIniciat, setIsIniciat] = useState(false);
  const { my_fcm } = useSelector((state) => state.common);
  const [timeId, setTimeId] = useState();

  var status = call_status;

  const user = {
    ...userInfo,
  };

  const navigation = useNavigation();

  const isCaller = props.route.params.isCaller;
  const isJoiner = props.route.params.isJoiner;
  const channelId = props.route.params.channel;
  const joinerUser = props.route.params.joinerUser;

  if (isCaller) {
    console.log('get call status', call_status);
  }

  const rtcProps = {
    appId: APP_ID,
    channel: channelId,
    LeaveChannel: () => {},
  };

  const callbacks = {
    EndCall: () => {
      deleteSession();
    },
    LeaveChannel: () => {},
  };

  const deleteSession = () => {
    firestore().collection('SESSION').doc(channelId).delete();
  };

  const localButtonStyle = {
    backgroundColor: '#78b0ff',
    borderColor: '#78b0ff',
  };

  const styleProps = {
    theme: '#000',
    localBtnStyles: {
      muteLocalAudio: localButtonStyle,
      muteLocalVideo: localButtonStyle,
      switchCamera: localButtonStyle,
      fullScreen: localButtonStyle,
    },
  };

  const getSessionInfo = () => {
    const unsubscribeListener = firestore()
      .collection('SESSION')
      .doc(channelId)
      .onSnapshot((querySnapshot) => {
        setSessionInfo(querySnapshot?._data);
      });
    return () => unsubscribeListener();
  };

  useEffect(() => {
    var clearId = setTimeout(function () {
      if (status === 'calling') {
        sendCallStatusNotification('reject');
        sendMissedCallNotification();
      }
    }, 20000);
    setTimeId(clearId);
    getSessionInfo();
    initialCall();
  }, []);

  useEffect(() => {
    if (call_status === 'answer') {
      clearTimeout(timeId);
    }
  }, [call_status]);

  useEffect(() => {
    if (isJoiner) {
      if (sessionInfo && !isJoinUser) {
        setIsJoinUser(true);
        joinUser();
      }
      if (isJoinUser && !sessionInfo) {
        navigation.goBack();
      }
    } else {
      if (isIniciat && !sessionInfo) {
        navigation.goBack();
      }
    }
  }, [sessionInfo]);

  if (isCaller) {
  }

  const initialCall = () => {
    if (isCaller) {
      const session = {
        userIds: [user?._id, joinerUser?._id],
        users: {
          [user?._id]: {
            _id: user?._id,
            name: user?.name,
            isJoin: true,
            isLeft: false,
          },
          [joinerUser?._id]: {
            _id: joinerUser?._id,
            name: joinerUser?.name,
            isJoin: false,
            isLeft: false,
          },
        },
      };
      firestore()
        .collection('SESSION')
        .doc(channelId)
        .set(session)
        .then((responce) => {
          setIsIniciat(true);
          sessionInfo(session);
        })
        .catch((error) => {});
    }
  };

  const joinUser = () => {
    let oppId = sessionInfo?.userIds[0];
    let oppTemp = sessionInfo?.users[oppId];
    setOppUser(sessionInfo?.users[oppId]);
    firestore()
      .collection('SESSION')
      .doc(channelId)
      .set({
        userIds: [oppTemp?._id, user?._id],
        users: {
          [user?._id]: {
            _id: user?._id,
            name: user?.name,
            isJoin: true,
            isLeft: false,
          },
          [oppTemp?._id]: oppTemp,
        },
      })
      .then((responce) => {})
      .catch((error) => {});
  };

  const sendMissedCallNotification = () => {
    const messageContaint = {
      to: joinerUser?.fcm,
      notification: {
        body: `You have miss call from ${user?.name}`,
        title: 'Miss Call',
      },
      data: {
        type: 'miss_call',
        channelId: channelId,
      },
    };
    sendPushNotification(messageContaint);
  };

  const reCallJoiner = () => {
    const messageContaint = {
      to: joinerUser?.fcm,
      notification: {
        body: `Incomming Call`,
        title: user?.name,
      },
      data: {
        type: 'incomming_call',
        oppFcm: my_fcm,
        channelId: channelId,
        oppProfile: user?.profile_url ? user?.profile_url : DUMMY_AVTAR,
      },
    };
    sendPushNotification(messageContaint);
    dispatch(setCallStatus('calling'));
    var clearId = setTimeout(function () {
      // if (status === 'calling') {
      sendCallStatusNotification('reject');
      sendMissedCallNotification();
      // }
    }, 20000);
    setTimeId(clearId);
  };

  const sendCallStatusNotification = (status) => {
    const messageContaint = {
      to: my_fcm,
      notification: { title: 'Call', body: 'Call Status' },
      data: {
        type: 'call_status',
        status: status,
      },
    };
    sendPushNotification(messageContaint);
  };

  return (
    <>
      <AgoraUIKit
        rtcProps={rtcProps}
        callbacks={callbacks}
        styleProps={styleProps}
        LeaveChannel={() => {}}
      />
      <CallingModal
        profile_url={
          joinerUser?.profile_url ? joinerUser?.profile_url : DUMMY_AVTAR
        }
        name={joinerUser?.name}
        visible={
          isCaller
            ? call_status === 'calling' || call_status === 'reject'
            : false
        }
        calcelCall={() => {
          sendMissedCallNotification();
          navigation.goBack();
        }}
        goBack={() => {
          navigation.goBack();
        }}
        reCall={() => {
          reCallJoiner();
        }}
        status={call_status}
      />
    </>
  );
}

const styles = StyleSheet.create({
  shareButtonText: {
    fontSize: 16,
  },
});
