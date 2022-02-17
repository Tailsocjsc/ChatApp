/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import CommonReducers from './CommonReducers';
import LoginReducers from './LoginReducers';
import NotificationReducers from './NotificationReducers';

export default combineReducers({
  auth: LoginReducers,
  common: CommonReducers,
  notification: NotificationReducers,
});
