// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { fetchUserInfo } from '../redux/slices';
// This is a utils folder. Feel free to make files to export functions into and
// import them into your components. This will help simplify components and allow
// us to unit test these functions without mounting components.

//utils/index.ts:

// export { default as DateUtils} from './DateUtils';
// export { default as StringUtils} from './StringUtils';
// export { default as NumberUtils} from './NumberUtils';

export const nothing = () => null;

// Set up user state
// export const useUser = () => {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.userReducer.userState);
//   useEffect(() => {
//     dispatch(fetchUserInfo());
//   });
//   return user;
// }