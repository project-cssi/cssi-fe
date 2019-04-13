import _ from 'lodash';
import {
  FETCH_USERS,
  ADD_USER,
  SET_EDITING_USER,
  SET_USER_VIEW_CONFIG,
  EDIT_USER,
  DELETE_USER,
  SET_DELETING_USER,
  SET_LOGGED_IN_USER,
  SET_LOGGED_IN_USER_USERNAME,
  UPDATE_USER_STATUS,
} from '../types';

const initialState = {
  users: [],
  newUser: {},
  editedUser: {},
  editingUser: {},
  deletingUser: {},
  userViewConfig: {},
  loggedInUser: {},
  loggedInUserUsername: '',
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        newUser: action.payload,
        users: [...state.users, action.payload],
      };
    case EDIT_USER:
      return {
        ...state,
        editedUser: action.payload,
        users: [..._.filter(state.users, user => user.username !== state.editingUser.username),
          action.payload],
      };
    case UPDATE_USER_STATUS:
      return {
        ...state,
        users: [..._.filter(state.users, user => user.username !== state.editingUser.username),
          action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
        users: [..._.filter(state.users, user => user.username !== state.deletingUser.username)],
      };
    case SET_EDITING_USER:
      return {
        ...state,
        editingUser: action.payload,
      };
    case SET_DELETING_USER:
      return {
        ...state,
        deletingUser: action.payload,
      };
    case SET_USER_VIEW_CONFIG:
      return {
        ...state,
        userViewConfig: action.payload,
      };
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case SET_LOGGED_IN_USER_USERNAME:
      return {
        ...state,
        loggedInUserUsername: action.payload,
      };
    default:
      return state;
  }
}
