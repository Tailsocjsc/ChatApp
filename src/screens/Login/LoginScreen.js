/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import colors from '../../utils/theme/colors';
import { showFlashMessage, validateLoginForm } from '../../utils/utils';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/actions/LoginActions';

import { updateUserToken } from '../../utils/firebase';

import firestore from '@react-native-firebase/firestore';
import { images } from '../../utils/images';
import LinearGradient from 'react-native-linear-gradient';
import { FAB, Portal, Provider } from 'react-native-paper';
import AcitonButton from '../../Custom/ActionButton';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);

  const getUserInfo = (id, token) => {
    firestore()
      .collection('USERS')
      .where('_id', '==', id)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
          };
        });
        dispatch(setUserData({ ...threads[0], fcm: token }));
        AsyncStorage.setItem(
          'userInfo',
          JSON.stringify({ ...threads[0], fcm: token })
        );
        navigation.reset({
          index: 0,
          routes: [{ name: 'MyTabs' }],
        });
      });
  };

  const onLogin = async () => {
    if (validateLoginForm(loginForm)) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then(async (userInfo) => {
          setLoading(false);

          let tokenDetails = await AsyncStorage.getItem('FCMToken');
          const token = JSON.parse(tokenDetails)?.token;
          // console.log('get token==', token);
          getUserInfo(userInfo?.user?.uid, token);
          updateUserToken(token, userInfo);
          showFlashMessage('Đăng nhập thành công');
        })
        .catch((e) => {
          setLoading(false);
          showFlashMessage('Tài khoản không có hoặc sai thông tin . Vui lòng đăng nhập lại');
        });
    }
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <View>
          <Text
            style={{ backgroundColor: '#E7E7E7', padding: 10, color: 'black' }}
          >
            Vui lòng nhập email để đăng nhập và mật khẩu để đăng nhập
          </Text>
          <View
            style={[
              styles.inputMainView,
              isFocus1 && {
                borderBottomColor: '#5DB1E7',
                borderBottomWidth: 2,
              },
            ]}
          >
            {/* <Image style={styles.iconView} source={images.user} /> */}
            <TextInput
              value={loginForm.email}
              placeholder={'Email (Example@gmail.com)'}
              onChangeText={(text) =>
                setLoginForm({ ...loginForm, email: text })
              }
              placeholderTextColor={colors.placeholder}
              multiline={true}
              style={[styles.textInput]}
              onFocus={() => {
                setIsFocus1(true);
                setIsFocus2(false);
              }}
            />
          </View>
        </View>
        <View style={{ height: 12 }} />
        <View>
          <View
            style={[
              styles.inputMainView,
              isFocus2 && {
                borderBottomColor: '#5DB1E7',
                borderBottomWidth: 2,
              },
            ]}
          >
            {/* <Image style={styles.iconView} source={images.password} /> */}
            <TextInput
              value={loginForm.password}
              placeholder={'Mật khẩu'}
              secureTextEntry={!showPassword}
              onChangeText={(text) =>
                setLoginForm({ ...loginForm, password: text })
              }
              placeholderTextColor={colors.placeholder}
              style={styles.textInput}
              onFocus={() => {
                setIsFocus1(false);
                setIsFocus2(true);
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordEye}
            >
              <Image
                style={styles.eyeIcon}
                source={showPassword ? images.show : images.hide}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{jus}}

        </View> */}
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onLogin()}
          style={{ width: 134, marginTop: 38 }}
        >
          <LinearGradient
            colors={['#E9837C', '#E7B859']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradient}
          >
            {!loading ? (
              <Text style={styles.googleText}>Sign In</Text>
            ) : (
              <ActivityIndicator
                size="large"
                style={{ height: 22, width: 22 }}
                color={colors.white}
              />
            )}
          </LinearGradient>
        </TouchableOpacity> */}
        <View style={styles.flexRow}>
          <Text style={styles.dontAccountFirst}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
            activeOpacity={0.8}
            style={styles.dontAccountView}
          >
            <Text style={styles.dontAccountText}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
        <AcitonButton  OnLogin={() => onLogin()}/>
      </View>
    </View>
  );
};

export default LoginScreen;
