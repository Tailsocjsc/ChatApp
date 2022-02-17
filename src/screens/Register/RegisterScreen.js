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
            console.log('file added');
            let profile_url = await reference.getDownloadURL();
            let tokenDetails = await AsyncStorage.getItem('FCMToken');
            const token = JSON.parse(tokenDetails)?.token;
            console.log('get token', token);

            registerUser(
              userInfo,
              loginForm.first_name + ' ' + loginForm.last_name,
              token,
              profile_url
            );
            console.log('register success');
            setLoading(false);
            showFlashMessage('User created successfully', 'success');
            navigation.navigate('LoginScreen');
          })
          .catch((e) => {
            setLoading(false);
            showFlashMessage(e.message);
          });
      }
    } else {
      showFlashMessage('Please upload image');
    }
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      cropping: true,
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
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.welcomeDetailText}>Create your account</Text>
        <View style={{ height: 28 }} />
        <TouchableOpacity
          onPress={() => openImagePicker()}
          activeOpacity={0.8}
          style={styles.profileImgae}
        >
          {profileImage ? (
            <Image
              style={[
                styles.profileImgae,
                { borderWidth: 2, borderColor: colors.textGrey },
              ]}
              source={{ uri: profileImage?.uri }}
            />
          ) : (
            <Image style={styles.profileImgae} source={images.user} />
          )}
        </TouchableOpacity>
        <Text style={styles.welcomeDetailText}>Choose image</Text>
        <View style={{ height: 22 }} />
        <View style={styles.nameRowView}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLable}>First Name</Text>
            <View style={styles.inputMainView}>
              <TextInput
                value={loginForm.first_name}
                placeholder={'Your First Name'}
                onChangeText={(text) =>
                  setLoginForm({ ...loginForm, first_name: text })
                }
                placeholderTextColor={colors.placeholder}
                multiline={true}
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLable}>Last Name</Text>
            <View style={styles.inputMainView}>
              <TextInput
                value={loginForm.last_name}
                placeholder={'Your Last Name'}
                onChangeText={(text) =>
                  setLoginForm({ ...loginForm, last_name: text })
                }
                placeholderTextColor={colors.placeholder}
                multiline={true}
                style={styles.textInput}
              />
            </View>
          </View>
        </View>
        <View style={{ height: 12 }} />
        <View>
          <Text style={styles.inputLable}>Last Name</Text>
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
        </TouchableOpacity>
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
