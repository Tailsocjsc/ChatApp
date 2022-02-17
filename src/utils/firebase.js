import { USER_TABLE } from './utils';
import firestore from '@react-native-firebase/firestore';

export const registerUser = (userInfo, name, token, profile_url) => {
  const userData = {
    name: name,
    email: userInfo?.user?.email,
    _id: userInfo?.user?.uid,
    fcm: token,
    profile_url: profile_url,
  };
  firestore()
    .collection(USER_TABLE)
    .doc(userInfo?.user?.uid)
    .set(userData)
    .then((responce) => {})
    .catch((error) => {});
};

export const updateUserToken = (token, userInfo) => {
  firestore()
    .collection(USER_TABLE)
    .doc(userInfo?.user?.uid)
    .set(
      {
        fcm: token,
      },
      { merge: true }
    )
    .then((responce) => {})
    .catch((error) => {});
};

export const getUserList = () => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(USER_TABLE)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
          };
        });
        resolve(threads);
      });
  });
};
