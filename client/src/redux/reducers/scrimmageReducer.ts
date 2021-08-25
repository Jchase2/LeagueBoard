//import { Scrimmage } from '../../domain/Dashboard/Scrimmage/ScrimmageTable';
import { EReduxActionTypes, IReduxBaseAction } from '../actions/ActionTypes';
import { IScrimmage } from '../../interfaces/Scrimmage';


// eslint-disable-next-line max-len
const scrimmageReducer = (scrimmages: IScrimmage[] = [], action:IReduxBaseAction) => { 
  // need to inialize state(scrimmages) , scrimmages is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case EReduxActionTypes.FETCH_UPCOMING_SCRIMMAGES:
      return action.payload;
    case EReduxActionTypes.UPDATE_UPCOMING_SCRIMMAGES:
      return action.payload;
    default:
      return;
  }
};

export default scrimmageReducer;