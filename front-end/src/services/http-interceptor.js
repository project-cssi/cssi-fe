import axios from 'axios';
import store from '../redux/store';
import { hideLoader, showLoader } from '../redux/actions/loader-actions';
import { getTokenFromCookie, validateCookie } from './cookies';
import { addNotification } from '../redux/actions/notification-actions';
import { userSignOut } from '../redux/actions/auth-actions';

class HttpInterceptor {
  constructor() {
    const defaultOptions = {};

    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use((request) => {
      request.headers.Authorization = getTokenFromCookie();
      store.dispatch(showLoader());
      return request;
    }, (error) => {
      if (error.request) {
        // The request was made but no response was received
        console.log('[ERROR]', ' [HTTP Interceptor, The request was made but no response was received', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('[ERROR]', ' [HTTP Interceptor, Something happened in setting up the request ', error);
      }
      setTimeout(() => {
        store.dispatch(hideLoader());
      }, 2000);
      return error;
    });

    instance.interceptors.response.use((response) => {
      store.dispatch(hideLoader());
      console.log('[INFO]', ' [HTTP Interceptor, Server responded with a response', response);

      // Set success the notification
      if (response.data && response.data.message && response.data.message !== '') {
        const notification = {
          level: 1,
          message: response.data.message,
        };
        store.dispatch(addNotification(notification));
      }
      return response;
    }, (error) => {
      setTimeout(() => {
        store.dispatch(hideLoader());
      }, 2000);
      if (!error.response) {
        // TODO: Network Error - Find a better way to catch network errors. The problem is with axios.
        console.log('[ERROR]', ' [HTTP Interceptor, Network Error', error);

        let notification = {};

        if (!validateCookie()) {
          notification = {
            level: 3,
            message: 'User session expired.',
          };
          store.dispatch(userSignOut(notification));
        } else {
          notification = {
            level: 3,
            message: 'An unknown network error has occurred.',
          };
          store.dispatch(addNotification(notification));
        }
      } else {
        // The request was made and the server responded with a response
        console.log('[ERROR]', ' [HTTP Interceptor, The request was made and the server responded', error.response);
        if (error.response.status) {
          switch (error.response.status) {
            case 401: {
            // Set the unauthorized error notification
              const notification = {
                level: 3,
                message: 'You are not authorized to access this feature.',
              };
              store.dispatch(addNotification(notification));
              // store.dispatch(userSignOut());
              break;
            }
            default: {
              console.log('[ERROR]', ' [HTTP Interceptor, Status Code', error.response.status);
              // Set the generic error notification
              const notification = {
                level: 3,
                message: error.response.data.message
                  ? error.response.data.message
                  : 'An unknown error has occurred. Please contact system administrator.',
              };
              store.dispatch(addNotification(notification));
              break;
            }
          }
        }
        return Promise.reject(error);
      }
    });

    return instance;
  }
}

export default HttpInterceptor;
