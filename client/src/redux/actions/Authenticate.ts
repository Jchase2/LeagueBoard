import { EReduxActionTypes } from './ActionTypes';
import { IHeaderUserToHome } from '../../interfaces/HeadUserToHome';
import { IUser } from '../../interfaces/User';
import { signUp, signIn } from '../../api/backendApi';
//need a signIn & signUp that connects to the backend though an api post request

export const Login = (form: IUser, history: any) => async (dispatch: (arg: { type: string; data: IHeaderUserToHome; }) => void) => {
  try {
    //use signIn here
    const { data }: any = await signIn(form);
    dispatch({
      type: EReduxActionTypes.AUTHENTICATE,
      data,
    });
    // after login push user to homepage
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

// export const Register = (form: IUser, history: string[]) => async (dispatch: (arg: { type: string; data: IHeaderUserToHome; }) => void) => {
//   try {
//     // use signUp here
//     const { data } = await signUp(form);

//     dispatch({
//       type: EReduxActionTypes.AUTHENTICATE,
//       data,
//     });

//     history.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };
