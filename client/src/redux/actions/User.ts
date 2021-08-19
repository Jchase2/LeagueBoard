import { getUserInfo } from "../../api/profileAPI";
import { EReduxActionTypes } from './ActionTypes';


export const getUser = () => async (dispatch: (arg: { type: string; payload: { data: any[]; }; }) => void) => {
    try {

        const { data } = await getUserInfo();

        const action = {
            type: EReduxActionTypes.FETCH_USER_INFO,
            payload: { data }
        }

        dispatch(action)

    } catch (err) {
        console.log(err);
    }

}

