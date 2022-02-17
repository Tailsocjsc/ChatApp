/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  AppState,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { images } from '../../utils/images';
import MessageItemView from '../../widget/MessageItemView';
import RoundAvatar from '../../widget/RoundAvatar';
import styles from './styles';
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AddFileModel from '../../components/AddFileModel';
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH, sendPushNotification } from '../../utils/utils';
import ImageViewModel from '../../widget/ImageViewModel';
import VideoViewModel from '../../widget/VideoViewModel';
import { TypingAnimation } from 'react-native-typing-animation';
import DocumentPicker from 'react-native-document-picker';
import { DUMMY_AVTAR } from '../../utils/utils';

import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import moment from 'moment';
import colors from '../../utils/theme/colors';
import { setCallStatus } from '../../store/actions/CommonActions';

let roomInfoGlobal;
let userGlobal;
const room_table = 'ROOMS';
const message_table = 'MESSAGES';

const Chat = ({ route, navigation }) => {
  const appState = useRef(AppState.currentState);
  const scrollViewRef = useRef();

  const dispatch = useDispatch();

  const [oppUser, setOppUser] = useState(route.params.userInfo);
  const { userInfo } = useSelector((state) => state.auth);
  const { my_fcm } = useSelector((state) => state.common);
  const user = {
    ...userInfo,
  };
  userGlobal = user;

  const [messageText, setMessageText] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [Room_id, setRoomId] = useState();
  const [openAttachModel, setOpenAttachModal] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [modelVideoOpen, setModelVideoOpen] = useState(false);
  const [containtUrl, setContaintUrl] = useState();
  const [roomDetails, setRoomDetails] = useState();
  const [isStatusSet, setIsStatusSet] = useState(false);
  const [stateTimer, setStateTimer] = useState();
  const [selectMessageCount, setSelectMessageCount] = useState(0);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        updateRoomStatus(true, roomInfoGlobal);
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;

      if (appState.current === 'background') {
        updateRoomStatus(false, roomInfoGlobal);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const createRoom = (message) => {
    let ID = user?._id + '-' + route.params.userInfo?._id;
    firebase
      .firestore()
      .collection(room_table)
      .doc(ID)
      .set({
        name: 'test room',
        latestMessage: {
          text: message,
          createdAt: new Date().getTime(),
        },
        userIds: [user?._id, oppUser?._id],
        users: {
          [user?._id]: {
            _id: user?._id,
            name: user?.name,
            typing: false,
            unReadMessage: 0,
            profile_url: user?.profile_url ? user?.profile_url : DUMMY_AVTAR,
          },
          [oppUser?._id]: {
            _id: oppUser?._id,
            name: oppUser?.name,
            typing: false,
            unReadMessage: 1,
            profile_url: oppUser?.profile_url
              ? oppUser?.profile_url
              : DUMMY_AVTAR,
          },
        },
      })
      .then((responce) => {
        setRoomId(ID);
        sendMessage(ID);
      })
      .catch((error) => {});
  };

  const getUserInfo = () => {
    firestore()
      .collection('USERS')
      .where('_id', '==', oppUser?._id)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
          };
        });
        setOppUser({ ...threads[0] });
      });
  };

  const getRoomInfo = () => {
    firestore()
      .collection(room_table)
      .where('userIds', 'array-contains', user?._id)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: { text: '' },
            ...documentSnapshot.data(),
          };
        });
        for (let i = 0; i < threads.length; i++) {
          let index = threads[i]?.userIds?.indexOf(oppUser?._id);
          if (index !== -1) {
            roomInfoGlobal = threads[i];
            setRoomDetails(threads[i]);
            setRoomId(threads[i]?._id);
          }
        }
      });
  };

  const getMessage = () => {
    const unsubscribeListener = firestore()
      .collection(room_table)
      .doc(Room_id)
      .collection(message_table)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }
          return data;
        });
        setMessageList(messages);
      });
    return () => unsubscribeListener();
  };

  const updateUnReadMessageCount = (count, user_id) => {
    let _tempRoom = { ...roomDetails };
    _tempRoom.users[user_id].unReadMessage = count;
    setRoomDetails({ ..._tempRoom });
    firestore()
      .collection(room_table)
      .doc(roomDetails._id)
      .set(
        {
          users: {
            ...roomDetails.users,
            [user_id]: {
              ...roomDetails.users[user_id],
              unReadMessage: count,
            },
          },
        },
        { merge: true }
      );
  };

  const updateRoomStatus = (status, details) => {
    if (details) {
      firestore()
        .collection(room_table)
        .doc(details._id)
        .set(
          {
            users: {
              ...details.users,
              [userGlobal?._id]: {
                ...details.users[userGlobal?._id],
                isInRoom: status,
                unReadMessage: 0,
                typing: false,
              },
            },
          },
          { merge: true }
        );
    }
  };

  useEffect(() => {
    roomInfoGlobal = null;
    getRoomInfo();
    getUserInfo();
  }, []);

  useEffect(() => {
    return () => {
      updateRoomStatus(false, roomInfoGlobal);
    };
  }, []);

  useEffect(() => {
    if (roomDetails && Room_id && !isStatusSet) {
      setIsStatusSet(true);
      updateRoomStatus(true, roomDetails);
    }
  }, [roomDetails, Room_id]);

  useEffect(() => {
    if (Room_id) {
      getMessage();
    }
  }, [Room_id]);

  const sendMessage = (roomId) => {
    if (messageText !== '') {
      let message = messageText;
      setMessageText('');

      firestore()
        .collection('ROOMS')
        .doc(roomId)
        .collection('MESSAGES')
        .add({
          message: messageText,
          createdAt: new Date().getTime(),
          user: {
            _id: user?._id,
            displayName: user?.name,
          },
        })
        .then((responce) => {
          const opUser = roomDetails.users[oppUser._id];
          if (!opUser.isInRoom) {
            let count = opUser.unReadMessage + 1;
            if (count !== 0) {
              sendNotification(message);
            }
            updateUnReadMessageCount(count, oppUser?._id);
          }
          updateLastMessageInRoom(message);
        })
        .catch((error) => {});
    }
  };

  const sendFileSendMessage = (type, url, fileName, isDocument) => {
    firestore()
      .collection('ROOMS')
      .doc(Room_id)
      .collection('MESSAGES')
      .add({
        message: fileName,
        createdAt: new Date().getTime(),
        type: type,
        file_url: url,
        isDocument: isDocument ? true : false,
        user: {
          _id: user?._id,
          displayName: user?.name,
        },
      })
      .then((responce) => {
        updateLastMessageInRoom(fileName);
      })
      .catch((error) => {});
  };

  const sendFile = (path, imageName, isDocument) => {
    const tempMessage = {
      type: 'image/jpeg',
      isSending: true,
      user: {
        _id: user?._id,
      },
    };
    setMessageList([...[tempMessage], ...messageList]);
    let reference = storage().ref(imageName); // 2
    let task = reference.putFile(path); // 3

    task
      .then((res) => {
        const fileType = res?.metadata?.contentType;
        reference.getDownloadURL().then((url) => {
          sendFileSendMessage(fileType, url, imageName, isDocument);
        });
      })
      .catch((e) => console.log('uploading image error => ', e));
  };

  const downloadFile = async (url, index) => {
    const fileName = url?.split('/')[url?.split('/').length - 1];
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    let exists = await RNFS.exists(localFile);
    if (!exists) {
      let list = [...messageList];
      list[index].isDownloading = true;
      setMessageList([...list]);
      RNFS.downloadFile(options)
        .promise.then(() => FileViewer.open(localFile))
        .then(() => {
          list[index].isDownloading = false;
          setMessageList([...list]);
          // success
        })
        .catch((error) => {
          list[index].isDownloading = false;
          setMessageList([...list]);
          // error
        });
    } else {
      FileViewer.open(localFile);
    }
  };

  const updateLastMessageInRoom = (message) => {
    if (Room_id) {
      firestore()
        .collection(room_table)
        .doc(Room_id)
        .set(
          {
            latestMessage: {
              text: message,
              createdAt: new Date().getTime(),
            },
          },
          { merge: true }
        );
    }
  };
  const openImagePicker = (type = 'image') => {
    if (type === 'video') {
      ImagePicker.openPicker({
        mediaType: 'video',
      }).then(async (fileImage) => {
        setOpenAttachModal(false);
        const filename =
          fileImage?.path.split('/')[fileImage?.path.split('/').length - 1];
        sendFile(fileImage?.path, filename);
      });
    } else {
      ImagePicker.openPicker({
        cropping: true,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
      }).then(async (fileImage) => {
        setOpenAttachModal(false);
        const filename =
          fileImage?.path.split('/')[fileImage?.path.split('/').length - 1];

        sendFile(fileImage?.path, filename);
      });
    }
  };

  const openDocumentPicker = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick();
      setOpenAttachModal(false);
      let fileUri = res[0]?.uri;
      let fileName = res[0]?.name;
      if (fileUri.startsWith('content://')) {
        const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        await RNFS.copyFile(fileUri, destPath);
        fileUri = destPath;
        sendFile(fileUri, fileName, true);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const updateTypingStatus = (status) => {
    if (roomDetails) {
      firestore()
        .collection(room_table)
        .doc(roomDetails._id)
        .set(
          {
            users: {
              ...roomDetails.users,
              [user?._id]: {
                ...roomDetails.users[user?._id],
                typing: status,
              },
            },
          },
          { merge: true }
        );
    }
  };

  const handleTyping = () => {
    let tempTimer = setTimeout(() => {
      updateTypingStatus(false);
    }, 1000);
    setStateTimer(tempTimer);
  };

  const sendNotification = (message) => {
    const messageContaint = {
      to: oppUser?.fcm,
      notification: { title: user?.name, body: message },
      data: { name: user?.name },
    };
    sendPushNotification(messageContaint);
  };

  const sendIncommingCallRequest = (channelId) => {
    const messageContaint = {
      to: oppUser?.fcm,
      notification: { title: user?.name, body: 'Incomming Call' },
      data: {
        type: 'incomming_call',
        channelId: channelId,
        oppFcm: my_fcm,
        oppProfile: user?.profile_url ? user?.profile_url : DUMMY_AVTAR,
      },
    };
    sendPushNotification(messageContaint);
  };

  const onSelectMessage = (index) => {
    let _tempList = [...messageList];
    if (_tempList[index]?.user?._id === user?._id) {
      if (_tempList[index].isSelected) {
        _tempList[index].isSelected = false;
        setSelectMessageCount(selectMessageCount - 1);
      } else {
        _tempList[index].isSelected = true;
        setSelectMessageCount(selectMessageCount + 1);
      }
      setMessageList([..._tempList]);
    }
  };

  const unselectAllMessage = () => {
    let _tempList = [...messageList];
    for (let i = 0; i < _tempList.length; i++) {
      _tempList[i].isSelected = false;
    }
    setMessageList([..._tempList]);
  };

  const onDelectMessage = () => {
    let selectedMessage = messageList.filter((e) => e.isSelected);
    for (let i = 0; i < selectedMessage.length; i++) {
      firestore()
        .collection(room_table)
        .doc(roomDetails._id)
        .collection('MESSAGES')
        .doc(selectedMessage[i]._id)
        .delete();
    }
    setSelectMessageCount(0);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.appHeader,
          {
            backgroundColor:
              selectMessageCount === 0 ? colors.primary : colors.secondary,
          },
        ]}
      >
        {selectMessageCount === 0 ? (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backView}
              >
                <Image source={images.back} style={styles.backIcon} />
              </TouchableOpacity>
              <View style={{ marginLeft: 12 }}>
                <RoundAvatar
                  image_url={
                    oppUser?.profile_url ? oppUser?.profile_url : DUMMY_AVTAR
                  }
                  size={38}
                  latter={oppUser?.name[0]}
                />
              </View>
              <Text style={styles.headingText}>{oppUser.name}</Text>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                unselectAllMessage();
                setSelectMessageCount(0);
              }}
              style={styles.backView}
            >
              <Image source={images.back} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headingText}>{'Selected Message'}</Text>
          </View>
        )}

        {selectMessageCount !== 0 ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headingText}>{selectMessageCount}</Text>
            <TouchableOpacity
              onPress={() => onDelectMessage()}
              style={styles.backView}
            >
              <Image source={images.delete} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              const joiner = {
                name: oppUser?.name,
                _id: oppUser?._id,
                fcm: oppUser?.fcm,
                profile_url: oppUser?.profile_url,
              };
              const channelId = user?._id + '-' + oppUser?._id;
              dispatch(setCallStatus('calling'));
              sendIncommingCallRequest(channelId);
              navigation.navigate('Conference', {
                channel: channelId,
                isCaller: true,
                joinerUser: joiner,
              });
            }}
            style={styles.backView}
          >
            <Image source={images.video} style={styles.backIcon} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={styles.containtView}
      >
        {messageList.length ? (
          <FlatList
            inverted={-1}
            scrollEnabled={false}
            onContentSizeChange={() => {
              if (scrollViewRef && scrollViewRef?.current) {
                scrollViewRef?.current?.scrollToEnd();
              }
            }}
            data={messageList}
            renderItem={({ item, index }) => {
              let isDateChange = false;
              if (index <= messageList.length - 1) {
                let currentDate = moment(item.createdAt).format('DD/MM/YYYY');
                let nextDate = moment(messageList[index + 1]?.createdAt).format(
                  'DD/MM/YYYY'
                );
                if (currentDate !== nextDate) {
                  isDateChange = true;
                }
              }
              console.log('item user id==', item?.user?._id);
              console.log('get user id==', user?._id);
              return (
                <TouchableOpacity style={{ zIndex: 999999 }} onPress={() => {}}>
                  <MessageItemView
                    id={item?.user?._id}
                    userName={item?.user?.displayName}
                    message={item?.message}
                    type={item?.type}
                    time={item.createdAt}
                    url={item?.file_url}
                    isSending={item?.isSending}
                    unReadMessage={
                      roomDetails.users[oppUser?._id].unReadMessage
                    }
                    index={index}
                    isDateChange={
                      isDateChange || index === messageList.length - 1
                    }
                    onOpenImage={(url) => {
                      setContaintUrl(url);
                      setModelOpen(true);
                    }}
                    onOpenVideo={(url) => {
                      setContaintUrl(url);
                      setModelVideoOpen(true);
                    }}
                    isDocument={item.isDocument}
                    onDownloadFile={(url) => downloadFile(url, index)}
                    isDownloading={item.isDownloading}
                    isSelected={item.isSelected}
                    onSelectMessage={onSelectMessage}
                    selectMessageCount={selectMessageCount}
                    postDetails={item?.postDetails}
                    userImageUrl={
                      item?.user?._id === user?._id
                        ? user?.profile_url
                        : oppUser?.profile_url
                    }
                    messageData={item}
                  />
                  {index === 0 && roomDetails.users[oppUser._id].typing && (
                    <View style={styles.typingView}>
                      <RoundAvatar
                        image_url={oppUser?.profile_url}
                        latter={oppUser?.name[0]}
                        size={30}
                      />
                      <TypingAnimation
                        dotMargin={5}
                        dotRadius={3}
                        dotSpeed={0.15}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        ) : null}
        <View style={{ height: 18 }} />
      </ScrollView>
      <View style={styles.footerView}>
        <View style={styles.subRow}>
          <TouchableOpacity
            onPress={() => setOpenAttachModal(true)}
            style={styles.addView}
          >
            <Image style={styles.addIcon} source={images.plus} />
          </TouchableOpacity>

          <TextInput
            multiline={true}
            value={messageText}
            onChangeText={(text) => {
              updateTypingStatus(true);
              setMessageText(text);
              clearTimeout(stateTimer);
              handleTyping();
            }}
            style={styles.inputStyle}
            placeholder="Type Message..."
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (Room_id) {
              sendMessage(Room_id);
            } else {
              createRoom(messageText);
            }
          }}
          style={styles.sendView}
        >
          <Image style={styles.sendIcon} source={images.send} />
        </TouchableOpacity>
      </View>
      <AddFileModel
        show={openAttachModel}
        onClose={() => setOpenAttachModal(false)}
        onImageSend={() => openImagePicker()}
        onVideoSend={() => openImagePicker('video')}
        onDocumentSend={() => openDocumentPicker()}
      />
      <ImageViewModel
        url={containtUrl}
        visible={modelOpen}
        onClose={() => setModelOpen(false)}
      />
      <VideoViewModel
        url={containtUrl}
        visible={modelVideoOpen}
        onClose={() => setModelVideoOpen(false)}
      />
    </View>
  );
};

export default Chat;
