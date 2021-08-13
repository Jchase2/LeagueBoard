import { EReduxActionTypes, IReduxBaseAction } from '../actions/ActionTypes';

const authReducer = (state = { authData: null }, action:IReduxBaseAction) => {
  switch (action.type) {
    case EReduxActionTypes.AUTHENTICATE:
      localStorage.setItem('home', JSON.stringify({token: action.data.token, userName: action.data.userName})); 
      // action?.data - does not throw an error when action doesnt have a data property
      return { ...state, authData: action.data};
    case EReduxActionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
