/* eslint-disable prettier/prettier */
import * as types from '../types';
import configureStore from '../../store/index';

export const setRoomList = (payload, userId) => {
  return {
    type: types.SET_ROOM_LIST,
    payload,
  };
};

export const setMessageCount = (payload, userId) => {
  return {
    type: types.SET_MESSAGE_COUNT,
    payload,
  };
};

export const setCallStatus = (payload) => {
  return {
    type: types.SET_CALL_STATUS,
    payload,
  };
};

export const setOppFamAction = (payload) => {
  return {
    type: types.SET_OPP_FCM,
    payload,
  };
};

export const setMyFcm = (payload) => {
  return {
    type: types.SET_MY_FCM,
    payload,
  };
};
