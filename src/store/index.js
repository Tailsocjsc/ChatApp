/* eslint-disable prettier/prettier */
import {createStore} from 'redux';
import reducers from './reducers';

export default function configureStore() {
  let store = createStore(reducers);
  return store;
}
