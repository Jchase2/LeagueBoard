import { combineReducers } from 'redux';

import authReducer from './authenticateReducer';
import scrimmageReducer from './scrimmageReducer';


export default combineReducers({
  // put all individual reducers here
  authenticate: authReducer,
  scrimmages: scrimmageReducer, 
});
