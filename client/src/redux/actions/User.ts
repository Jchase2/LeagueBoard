import { EReduxActionTypes } from '../actions/ActionTypes';
import { getRecentMatches } from '../../api/backendApi';

// Action Creators - functions that return an action

export const getAllScrimmages = () => async (dispatch: (arg: { type: string; payload: { data: any[]; }; }) => void) => {
   try {
    const { data } = await getRecentMatches(); // decontruct response to grab data from response object
    
    const action = {
      type: EReduxActionTypes.FETCH_USER_INFO,
      payload: { data },
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  } 
};


