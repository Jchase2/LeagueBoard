import { Scrimmage } from '../../domain/Dashboard/Scrimmage/Scrimmage';
import { EReduxActionTypes, IReduxBaseAction } from '../actions/ActionTypes';


// eslint-disable-next-line max-len
const holdingsReducer = (scrimmages: Scrimmage[] = [], action:IReduxBaseAction) => { // need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case EReduxActionTypes.FETCH_UPCOMING_SCRIMMAGES:
      return action.payload;
    case EReduxActionTypes.UPDATE_UPCOMING_SCRIMMAGES:
      return action.payload;
    default:
      return Scrimmage;
  }
};

export default holdingsReducer;