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
import styles from './styles';
import auth from '@react-native-firebase/auth';
import { showFlashMessage, validateRegisterForm } from '../../utils/utils';
import { registerUser } from '../../utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH } from '../../utils/utils';
import storage from '@react-native-firebase/storage';
import { images } from '../../utils/images';
import LinearGradient from 'react-native-linear-gradient';
import AcitonButton from '../../Custom/ActionButton';

const RegisterScreen = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    last_name: '',
    first_name: '',
    email: '',
    password: '',
  });
  const [profileImage, setProfileImage] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [isFocus4, setIsFocus4] = useState(false);
  const [isFocus5, setIsFocus5] = useState(false);

  const onRegister = async () => {
    if (profileImage) {
      console.log('profileImage', profileImage);
      if (validateRegisterForm(loginForm)) {
        setLoading(true);
        auth()
          .createUserWithEmailAndPassword(loginForm.email, loginForm.password)
          .then(async (userInfo) => {
            let reference = storage().ref(profileImage?.name);
            await reference.putFile(profileImage?.uri);
            // console.log('file added');
            let profile_url = await reference.getDownloadURL();
            let tokenDetails = await AsyncStorage.getItem('FCMToken');
            const token = JSON.parse(tokenDetails)?.token;
            // console.log('get token', token);

            registerUser(
              userInfo,
              loginForm.first_name + ' ' + loginForm.last_name,
              token,
              profile_url
            );
            // console.log('register success');
            setLoading(false);
            showFlashMessage('Tạo tài khoản thành công');
            navigation.navigate('LoginScreen');
          })
          .catch((e) => {
            setLoading(false);
            showFlashMessage(e.message);
          });
      }
    } else {
      showFlashMessage('Hãy chọn ảnh đại diện');
    }
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      // cropping: true,
      height: SCREEN_WIDTH,
      width: SCREEN_WIDTH,
    }).then(async (fileImage) => {
      const filename =
        fileImage?.path.split('/')[fileImage?.path.split('/').length - 1];
      setProfileImage({ uri: fileImage?.path, name: filename });
    });
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <View style={{}}>
          <Text
            style={{ backgroundColor: '#E7E7E7', padding: 10, color: 'black' }}
          >
            Vui lòng nhập đầy đủ thông tin để đăng kí
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => openImagePicker()}
            activeOpacity={0.8}
            style={[styles.profileImgae]}
          >
            {profileImage ? (
              <Image
                style={[
                  styles.profileImgae,
                  { borderWidth: 1, borderColor: colors.textGrey },
                ]}
                source={{ uri: profileImage?.uri }}
              />
            ) : (
              <Image style={styles.profileImgae} source={images.user} />
            )}
          </TouchableOpacity>
          <Text style={styles.welcomeDetailText}>Chọn ảnh</Text>
        </View>

        <View style={{ height: 22 }} />
        <View style={styles.nameRowView}>
          <View style={{ flex: 1 }}>
            <View
              style={[
                styles.inputMainView,
                isFocus1 && {
                  borderBottomColor: '#5DB1E7',
                  borderBottomWidth: 2,
                },
              ]}
            >
              <TextInput
                value={loginForm.first_name}
                placeholder={'Họ'}
                onChangeText={(text) =>
                  setLoginForm({ ...loginForm, first_name: text })
                }
                placeholderTextColor={colors.placeholder}
                multiline={true}
                style={styles.textInput}
                onFocus={() => {
                  setIsFocus1(true);
                  setIsFocus2(false);
                  setIsFocus3(false);
                  setIsFocus4(false);
                  setIsFocus5(false);
                }}
              />
            </View>
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <View style={[
                styles.inputMainView,
                isFocus2 && {
                  borderBottomColor: '#5DB1E7',
                  borderBottomWidth: 2,
                },
              ]}>
              <TextInput
                value={loginForm.last_name}
                placeholder={'Tên '}
                onChangeText={(text) =>
                  setLoginForm({ ...loginForm, last_name: text })
                }
                placeholderTextColor={colors.placeholder}
                multiline={true}
                style={styles.textInput}
                onFocus={() => {
                  setIsFocus1(false);
                  setIsFocus2(true);
                  setIsFocus3(false);
                  setIsFocus4(false);
                  setIsFocus5(false);
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ height: 12 }} />
        <View>
          <View style={[
                styles.inputMainView,
                isFocus3 && {
                  borderBottomColor: '#5DB1E7',
                  borderBottomWidth: 2,
                },
              ]}>
            <TextInput
              value={loginForm.email}
              placeholder={'Email (Example@gmail.com)'}
              onChangeText={(text) =>
                setLoginForm({ ...loginForm, email: text })
              }
              placeholderTextColor={colors.placeholder}
              multiline={true}
              style={styles.textInput}
              onFocus={() => {
                setIsFocus1(false);
                setIsFocus2(false);
                setIsFocus3(true);
                setIsFocus4(false);
                setIsFocus5(false);
              }}
            />
          </View>
        </View>
        <View style={{ height: 12 }} />
        <View>
          <View style={[
                styles.inputMainView,
                isFocus4 && {
                  borderBottomColor: '#5DB1E7',
                  borderBottomWidth: 2,
                },
              ]}>
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
                setIsFocus2(false);
                setIsFocus3(false);
                setIsFocus4(true);
                setIsFocus5(false);
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
        <AcitonButton OnRegister={() => onRegister()} />
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onRegister()}
          style={{ width: 134, marginTop: 38 }}
        >
          <LinearGradient
            colors={['#E9837C', '#E7B859']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradient}
          >
            {!loading ? (
              <Text style={styles.googleText}>Sign Up</Text>
            ) : (
              <ActivityIndicator
                size="large"
                style={{ height: 22, width: 22 }}
                color={colors.white}
              />
            )}
          </LinearGradient>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => onRegister()}
          style={styles.googleButton}
        >
          {!loading ? (
            <Text style={styles.googleText}>Register</Text>
          ) : (
            <ActivityIndicator
              size="large"
              style={{ height: 22, width: 22 }}
              color={colors.white}
            />
          )}
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default RegisterScreen;
