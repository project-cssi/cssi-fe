import { USER_LOG_IN, USER_SIGN_OUT } from '../types';

const initialState = {
  isUserLoggedIn: true,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOG_IN:
      return {
        ...state,
        isUserLoggedIn: true,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
}
