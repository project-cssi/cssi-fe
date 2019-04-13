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
import { API_ENDPOINTS } from '../../api';
import { HttpInterceptor } from '../../services';
import store from '../store';

const http = new HttpInterceptor();

export const fetchUsers = () => (dispatch) => {
  const endpoint = API_ENDPOINTS.getUsers;
  return http.get(endpoint)
    .then((response) => {
      dispatch({
        type: FETCH_USERS,
        payload: response.data.users,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Users, fetchUsers()]: HTTP GET - Callback Error', error);
    });
};

export const createUser = body => (dispatch) => {
  const endpoint = API_ENDPOINTS.createUser;
  return http.post(endpoint, body)
    .then((response) => {
      dispatch({
        type: ADD_USER,
        payload: response.data.payload,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Users, createUser()]: HTTP POST - Callback Error', error);
    });
};

export const editUser = body => (dispatch) => {
  const endpoint = API_ENDPOINTS.editUser
    .format(store.getState().users.editingUser.username);
  return http.put(endpoint, body)
    .then((response) => {
      dispatch({
        type: EDIT_USER,
        payload: response.data.payload,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Users, editUser()]: HTTP PUT - Callback Error', error);
    });
};

export const deleteUser = id => (dispatch) => {
  const endpoint = API_ENDPOINTS.deleteUser
    .format(id);
  return http.delete(endpoint, id)
    .then((response) => {
      dispatch({
        type: DELETE_USER,
        payload: response.data.payload,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Users, deleteUser()]: HTTP DELETE - Callback Error', error);
    });
};

export const setLoggedInUser = username => (dispatch) => {
  const endpoint = API_ENDPOINTS.getUserInfo
    .format(username);
  return http.get(endpoint)
    .then((response) => {
      dispatch({
        type: SET_LOGGED_IN_USER,
        payload: response.data.user,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Users, getUserInfo()]: HTTP GET - Callback Error', error);
    });
};

export const updateUserActivationStatus = data => (dispatch) => {
  const endpoint = API_ENDPOINTS.updateUserStatus
    .format(data.username);
  const body = {
    status: data.status === 'activated'
      ? 'suspended'
      : 'activated',
  };
  return http.patch(endpoint, body)
    .then((response) => {
      console.log('[INFO]', ' [Users, getUserInfo()]: HTTP PATCH - Callback Success', response);
      dispatch({
        type: UPDATE_USER_STATUS,
        payload: _.assign({}, data, response.data.payload),
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Users, getUserInfo()]: HTTP PATCH - Callback Error', error);
    });
};

export const setDeletingUser = user => (dispatch) => {
  return dispatch({
    type: SET_DELETING_USER,
    payload: user,
  });
};

export const setEditingUser = user => dispatch => dispatch({
  type: SET_EDITING_USER,
  payload: user,
});

export const setUserViewConfig = config => dispatch => dispatch({
  type: SET_USER_VIEW_CONFIG,
  payload: config,
});

export const setLoggedInUserUsername = username => dispatch => dispatch({
  type: SET_LOGGED_IN_USER_USERNAME,
  payload: username,
});
