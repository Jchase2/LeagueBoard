import { EReduxActionTypes } from '../actions/ActionTypes';

interface IScrimmage {
  date: Date,
  time: TimeRanges,
  teams: ITeams[],
}
interface ITeams {
  team1: ITeam1,
  team2: ITeam2
}
interface ITeam1 {
  name: string,
  players: IPlayer[]
}
interface ITeam2 {
  name: string,
  players: IPlayer[]
}
interface IPlayer {
  name: string,
  id: string
}
// Action Creators - functions that return an action

export const getAllScrimmages = () => async (dispatch: (arg: { type: string; payload: { holdings: IScrimmage[]; }; }) => void) => {
  try {
    const { data } = await getScrimmage(); // decontruct response to grab data from response object
    const { scrimmage } = data;
    const action = {
      type: EReduxActionTypes.FETCH_UPCOMING_SCRIMMAGES,
      payload: { scrimmage },
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateScrimmages = (createScrimmage: IScrimmage) => async (dispatch: (arg: { type: string; payload: { holdings: IScrimmage }; }) => void) => {
  try {
    const { data } = await putScrimmage(order);
    const { scrimmage } = data;
    const action = {
      type: EReduxActionTypes.UPDATE_UPCOMING_SCRIMMAGES,
      payload: { scrimmage },
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};
