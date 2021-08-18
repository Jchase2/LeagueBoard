import { EReduxActionTypes } from '../actions/ActionTypes';
import { IScrimmage } from '../../interfaces/Scrimmage';

// Action Creators - functions that return an action

export const getAllScrimmages = () => async (dispatch: (arg: { type: string; payload: { scrimmages: IScrimmage[]; }; }) => void) => {
  /* try {
    const { data } = await getScrimmage(); // decontruct response to grab data from response object
    const { scrimmage } = data;
    const action = {
      type: EReduxActionTypes.FETCH_UPCOMING_SCRIMMAGES,
      payload: { scrimmage },
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  } */
};

export const updateScrimmages = (createScrimmage: IScrimmage) => async (dispatch: (arg: { type: string; payload: { scrimmages: IScrimmage }; }) => void) => {
  /* try {
    const { data } = await putScrimmage(form);
    const { scrimmage } = data;
    const action = {
      type: EReduxActionTypes.UPDATE_UPCOMING_SCRIMMAGES,
      payload: { scrimmage },
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  } */
};
