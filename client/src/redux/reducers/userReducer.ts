import { EReduxActionTypes, IReduxBaseAction } from "../actions/ActionTypes";

const userReducer = (data: any[] = [], action: IReduxBaseAction) => {
  switch (action.type) {
    case EReduxActionTypes.FETCH_USER_INFO:
      return action.payload;
    default:
      return data;
  }
};

export default userReducer;