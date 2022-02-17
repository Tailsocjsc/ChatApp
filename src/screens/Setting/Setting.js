import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import RoundAvatar from '../../widget/RoundAvatar';
import Images from '../../Image/Index';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Setting = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <RoundAvatar size={42} image_url={userInfo?.profile_url} />
        <View>
          <Text style={{ color: 'black', marginLeft: 10 }}>
            {userInfo?.name}
          </Text>
          <Text style={{ color: 'gray', marginLeft: 10 }}>
            Xem trang cá nhân
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottomColor: 'gray',
            paddingVertical: 10,
            borderBottomWidth: 0.5,
          }}
        >
          <Image
            source={Images.ic_verified}
            style={{ height: 20, width: 20 }}
          />
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
            }}
          >
            Tài khoản và bảo mật
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Image source={Images.ic_padlock} style={{ height: 20, width: 20 }} />
        <Text style={{ color: 'black', marginLeft: 10 }}>Quyền riêng tư</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          AsyncStorageLib.clear();
          props.navigation.navigate('SplashScreen');
        }}
        style={{
          backgroundColor: 'white',
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Image source={Images.ic_out} style={{ height: 20, width: 20 }} />
        <Text style={{ color: 'black', marginLeft: 10 }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
