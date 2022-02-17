/* eslint-disable prettier/prettier */
import * as types from '../types';

export const setUserData = (payload) => ({
  type: types.SET_USER_DATA,
  payload,
});
