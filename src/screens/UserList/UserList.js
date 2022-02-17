/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '../../utils/images';
import UserItemView from '../../widget/UserItemView';
import styles from './styles';

import auth from '@react-native-firebase/auth';
import { getUserList } from '../../utils/firebase';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import SearchBar from '../../widget/SearchBar';
import { DUMMY_AVTAR } from '../../utils/utils';

const UserListScreen = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [mainUserList, setMainUserList] = useState([]);
  const [userList, setUserList] = useState([]);

  const initData = async () => {
    const list = await getUserList();
    console.log('get list here==', list);
    setMainUserList([...list]);
    setUserList([...list]);
  };

  useEffect(() => {
    initData();
  }, []);

  const onSearchPeople = (test) => {
    let filterdArrey = mainUserList.filter((item) => {
      return item?.name?.toLowerCase().match(test);
    });
    setUserList([...filterdArrey]);
  };

  return (
    <View style={styles.scrollCotainer}>
      <View style={styles.appHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backView}
          >
            <Image source={images.back} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.headingText}>{'All Users'}</Text>
        </View>
      </View>
      <View style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}>
        <SearchBar
          onChange={(text) => onSearchPeople(text)}
          placeHolder={'Search People'}
        />
      </View>
      <ScrollView style={styles.containtView}>
        {userList.map((item) => {
          return userInfo?._id !== item?._id ? (
            <UserItemView
              onPress={() => navigation.navigate('Chat', { userInfo: item })}
              name={item.name}
              profileImage={item?.profile_url ? item?.profile_url : DUMMY_AVTAR}
            />
          ) : null;
        })}
      </ScrollView>
    </View>
  );
};

export default UserListScreen;
