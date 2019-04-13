import { ADD_NOTIFICATION, INITIALIZE_NOTIFICATION } from '../types';

const initialState = {
  notification: null,
  notificationSystem: null,
};

export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_NOTIFICATION:
      return {
        ...state,
        notificationSystem: action.payload,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
}
