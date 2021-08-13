import { combineReducers } from 'redux';

import authReducer from './authenticateReducer';


export default combineReducers({
  // put all individual reducers here

  authenticate: authReducer,

});
