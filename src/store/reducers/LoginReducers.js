/* eslint-disable prettier/prettier */
import * as types from '../types';

const initialState = {
  userInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
};
