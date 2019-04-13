import { USER_LOG_IN, USER_SIGN_OUT } from '../types';
import { API_ENDPOINTS } from '../../api';
import { HttpInterceptor, setCookie, signOut } from '../../services';
import { addNotification } from './notification-actions';

const http = new HttpInterceptor();

export const userLogIn = body => dispatch => {
  /* const endpoint = API_ENDPOINTS.authorize;
  return http
    .post(endpoint, body)
    .then(response => {
      if (response.data.token) {
        setCookie(body);
        dispatch({
          type: USER_LOG_IN,
          payload: response.data
        });
      }
    })
    .catch(error => {
      console.log(
        '[ERROR]',
        ' [Auth, userLogIn()]: HTTP POST - Callback Error',
        error
      );
    }); */

  const body = {
    username: 'brion@apareciumlabs.com',
    hashedPassword:
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  };

  setCookie(body);
  dispatch({
    type: USER_LOG_IN,
    payload: body
  });
};

export const userSignOut = notification => dispatch => {
  dispatch(addNotification(notification));
  setTimeout(() => {
    signOut(); // removes cookie, and redirects
  }, 1000);
  setTimeout(() => {
    dispatch({
      type: USER_SIGN_OUT
    });
  }, 2000);
};
