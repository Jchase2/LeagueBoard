import { combineReducers } from 'redux';

import authReducer from './authenticateReducer';
import userReducer from './userReducer';


export default combineReducers({
  // put all individual reducers here
  authenticate: authReducer,
  users: userReducer,
});
