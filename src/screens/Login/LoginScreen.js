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

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
          routes: [{ name: 'HomeScreen' }],
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
          console.log('get token==', token);
          getUserInfo(userInfo?.user?.uid, token);
          updateUserToken(token, userInfo);
          showFlashMessage('Login Successfully', 'success');
        })
        .catch((e) => {
          setLoading(false);
          showFlashMessage(e.message);
        });
    }
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.welcomeDetailText}>Login in to your account</Text>
        <View style={{ height: 22 }} />
        <View>
          <Text style={styles.inputLable}>Email Address</Text>
          <View style={styles.inputMainView}>
            <Image style={styles.iconView} source={images.user} />
            <TextInput
              value={loginForm.email}
              placeholder={'Example@gmail.com'}
              onChangeText={(text) =>
                setLoginForm({ ...loginForm, email: text })
              }
              placeholderTextColor={colors.placeholder}
              multiline={true}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={{ height: 12 }} />
        <View>
          <Text style={styles.inputLable}>Password</Text>
          <View style={styles.inputMainView}>
            <Image style={styles.iconView} source={images.password} />
            <TextInput
              value={loginForm.password}
              placeholder={'Enter Password'}
              secureTextEntry={!showPassword}
              onChangeText={(text) =>
                setLoginForm({ ...loginForm, password: text })
              }
              placeholderTextColor={colors.placeholder}
              style={styles.textInput}
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
        <TouchableOpacity
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
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Text style={styles.dontAccountFirst}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
            activeOpacity={0.8}
            style={styles.dontAccountView}
          >
            <Text style={styles.dontAccountText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
