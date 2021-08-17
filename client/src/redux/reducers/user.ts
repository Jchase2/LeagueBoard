import { EReduxActionTypes, IReduxBaseAction } from '../actions/ActionTypes';

// eslint-disable-next-line max-len
const userReducer = (data: any[] = [], action:IReduxBaseAction) => { 
  switch (action.type) {
    case EReduxActionTypes.FETCH_USER_INFO:
      return action.payload;
    default:
      return data;
  }
};

export default userReducer;