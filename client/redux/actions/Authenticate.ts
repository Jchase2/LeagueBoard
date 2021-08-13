import { EReduxActionTypes } from './ActionTypes';
import { HeaderUserToHomeI } from '../interfaces/HeadUserToHome';
import { UserI } from '../interfaces/User';
//need a signIn & signUp that connects to the backend though an api post request

export const Login = (form: UserI, history: any) => async (dispatch: (arg: { type: string; data: HeaderUserToHomeI; }) => void) => {
  try {
    //use signIn here
    const { data }: any = await signIn(form);
    dispatch({
      type: EReduxActionTypes.AUTHENTICATE,
      data,
    });

    history.push('/');
    // after login push user to homepage
  } catch (error) {
    console.log(error);
  }
};

export const Register = (form: UserI, history: string[]) => async (dispatch: (arg: { type: string; data: HeaderUserToHomeI; }) => void) => {
  try {
    // use signUp here
    const { data } = await signUp(form);

    dispatch({
      type: EReduxActionTypes.AUTHENTICATE,
      data,
    });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
