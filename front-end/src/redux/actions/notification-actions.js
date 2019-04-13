import { ADD_NOTIFICATION, INITIALIZE_NOTIFICATION } from '../types';

export const initialize = notificationSystem => (dispatch) => {
  dispatch({
    type: INITIALIZE_NOTIFICATION,
    payload: notificationSystem,
  });
};

export const addNotification = notification => (dispatch) => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: notification,
  });
};
