/* eslint-disable prettier/prettier */
import * as types from '../types';

const initialState = {
  room_list: [],
  message_count: 0,
  call_status: '',
  opp_fam: null,
  my_fcm: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ROOM_LIST:
      return {
        ...state,
        room_list: action.payload,
      };
    case types.SET_MESSAGE_COUNT:
      return {
        ...state,
        message_count: action.payload,
      };

    case types.SET_MY_FCM:
      return {
        ...state,
        my_fcm: action.payload,
      };
    case types.SET_CALL_STATUS:
      return {
        ...state,
        call_status: action.payload,
      };
    case types.SET_OPP_FCM:
      return {
        ...state,
        opp_fam: action.payload,
      };

    default:
      return state;
  }
};
