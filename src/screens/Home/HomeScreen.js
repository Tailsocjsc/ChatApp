/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { images } from '../../utils/images';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import { setMyFcm, setRoomList } from '../../store/actions/CommonActions';
import SearchBar from '../../widget/SearchBar';
import UserItemView from '../../widget/UserItemView';
import AppMenu from '../../components/AppMenu';
import HeaderComponent from '../../widget/HeaderComponent';
import moment from 'moment';

const Home = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const user = {
    ...userInfo,
  };

  const { room_list } = useSelector((state) => state.common);
  const [rooms, setRooms] = useState(room_list);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const room_table = 'ROOMS';

  const getRooList = () => {
    const unsubscribe = firestore()
      .collection(room_table)
      .where('userIds', 'array-contains', user?._id)
      .onSnapshot((querySnapshot) => {
        let threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: { text: '' },
            ...documentSnapshot.data(),
          };
        });
        if (threads && threads.length) {
          threads.sort(
            (a, b) => b?.latestMessage?.createdAt - a?.latestMessage?.createdAt
          );
        }
        dispatch(setRoomList(threads, user?._id));

        setRooms(threads);
      });

    return () => unsubscribe();
  };

  const getMyInfo = () => {
    firestore()
      .collection('USERS')
      .where('_id', '==', user?._id)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
          };
        });
        let data = threads[0];
        dispatch(setMyFcm(data?.fcm));
      });
  };

  useEffect(() => {
    getMyInfo();
    getRooList();
  }, []);

  const onSearchConnection = (test) => {
    let filterdArrey = room_list.filter((item) => {
      const oppId = item.userIds.filter((e) => e !== user?._id)[0];
      return item?.users[oppId]?.name?.toLowerCase().match(test);
    });
    setRooms([...filterdArrey]);
  };

  const renderItem = (item, index) => {
    console.log('create date ', item?.latestMessage?.createdAt);
    const oppId = item.userIds.filter((e) => e !== user?._id)[0];
    return (
      <View style={{ justifyContent: 'center' }}>
        <UserItemView
          onPress={() =>
            navigation.navigate('Chat', { userInfo: item?.users[oppId] })
          }
          name={item?.users[oppId]?.name}
          details={item?.latestMessage?.text}
          hasUnread={item?.users[user?._id]?.unReadMessage !== 0}
          profileImage={item?.users[oppId]?.profile_url}
          time={moment(item?.latestMessage?.createdAt).format('HH:mm')}
          isTyping={item?.users[oppId]?.typing}
          unreadMessage={item?.users[user?._id]?.unReadMessage}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.containtView}
        >
          {rooms.map((item, index) => {
            return renderItem(item, index);
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
