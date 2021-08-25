import { combineReducers } from 'redux';

import scrimmageReducer from './scrimmageReducer';


export default combineReducers({
  // put all individual reducers here
  scrimmages: scrimmageReducer, 
});
