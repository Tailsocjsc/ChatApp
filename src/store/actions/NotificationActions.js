/* eslint-disable prettier/prettier */
import * as types from '../types';

export const showNotification = (payload) => ({
  type: types.SET_NOTIFICATION,
  payload,
});

export const hideNotification = () => ({
  type: types.SET_NOTIFICATION,
  payload: null,
});
