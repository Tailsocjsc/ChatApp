/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */

import { Image, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
// import FCM from 'fcm-node';
import axios from 'axios';

export const { OS } = Platform;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export let MyGFcm = '';

export const setMyGFcm = (fcm) => {
  MyGFcm;
};

export const DUMMY_AVTAR =
  'https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png';

export const SERVER_KEY =
  'AAAALqgw4as:APA91bELreJnWTOIbz9P6vdUhW44Kc9YvaX7fLPqd4fw9Ru-ZyQDjyNtlfrUbFlGbdvqPaaRD2MPDBMMjyFeYcu0r68N1PPDdLseUTTZPBY8039Pyjb2FFTPsGdC_3hFETbf4YNQwqck';

/**
 * Load Static Image
 * @param {*} source : image source path
 * @returns {uri, width, height}
 */

/**
 * Format date
 * @param {*} strDate as date string
 * @returns : date, time, both as dateTime
 */

export const validateEmail = (val) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  );
};

export const validateLoginForm = (form) => {
  if (form.email === '') {
    showFlashMessage('Enter email');
    return false;
  } else if (!validateEmail(form.email)) {
    showFlashMessage('Enter valid email');
    return false;
  } else if (form.password === '') {
    showFlashMessage('Enter valid password');
    return false;
  } else {
    return true;
  }
};

export const validateRegisterForm = (form) => {
  if (form.email === '') {
    showFlashMessage('Enter email');
    return false;
  } else if (!validateEmail(form.email)) {
    showFlashMessage('Enter valid email');
    return false;
  } else if (form.password === '') {
    showFlashMessage('Enter valid password');
    return false;
  } else if (form.first_name === '') {
    showFlashMessage('Enter first name');
    return false;
  } else if (form.last_name === '') {
    showFlashMessage('Enter last name');
    return false;
  } else {
    return true;
  }
};

export const Logout = async (navigation) => {
  await AsyncStorage.clear();
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  }, 500);
};

export const showFlashMessage = (message, type = 'danger') => {
  showMessage({
    message: message,
    type: type,
  });
};

export const getTimeDiffreance = (time) => {
  const currentTime = new Date().getTime();
  const postTime = new Date(time);
  let ts = (currentTime - postTime.getTime()) / 1000;

  var d = Math.floor(ts / (3600 * 24));
  var h = Math.floor((ts % (3600 * 24)) / 3600);
  var m = Math.floor((ts % 3600) / 60);
  var s = Math.floor(ts % 60);
  if (d > 0) {
    return `${d} days`;
  } else if (h > 0) {
    return `${h} hours`;
  } else if (m > 0) {
    return `${m} min`;
  } else {
    return `${s} sec`;
  }
};

export const USER_TABLE = 'USERS';

export const FCM =
  'eCJSOt3ZQJuiQPHChCR7bd:APA91bFg0xUnWXHfDxeolh9jXWvc06y1N9gug9XrFHvRqb9bsN7FlPc99F2wOda8v5ZnF5rUX6dOZZedyrvEIuNWEViIzHXc3Dx0misLoqnz1RO1rjyd1D4swOIY4zKRxPxiTqs51Zcv';
const api_key = 'AIzaSyAGXDWJu7ftipiGcT2s7YGisczHP8cVN1g';

export const sendPushNotification = (message) => {
  console.log(
    'is now',
    JSON.stringify({
      to: FCM,
      notification: { title: 'Test', body: 'Test' },
    })
  );

  axios({
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    data: JSON.stringify(message),
    headers: {
      Authorization: `key=${SERVER_KEY}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log('res===', res.data);
    })
    .catch((error) => console.log('error==', error));
};
