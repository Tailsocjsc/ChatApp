/* eslint-disable prettier/prettier */
import * as types from '../types';

const initialState = {
  activeNotification: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATION:
      return {
        ...state,
        activeNotification: action.payload,
      };

    default:
      return state;
  }
};
