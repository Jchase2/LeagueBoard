import { combineReducers } from 'redux';

import authReducer from './authenticateReducer';
import scrimmageReducer from './scrimmageReducer';
import userReducer from './userReducer';


export default combineReducers({
  // put all individual reducers here
  authenticate: authReducer,
  scrimmages: scrimmageReducer, 
  users: userReducer,
});
