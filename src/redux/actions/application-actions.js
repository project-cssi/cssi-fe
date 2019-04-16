import _ from 'lodash';
import {
  FETCH_APPLICATIONS,
  ADD_APPLICATION,
  EDIT_APPLICATION,
  DELETE_APPLICATION,
  SET_EDITING_APPLICATION,
  SET_DELETING_APPLICATION,
  SET_APPLICATION_VIEW_CONFIG,
  UPDATE_APPLICATION_SHARING_STATUS,
  SET_SELECTED_APPLICATION,
  FETCH_APPLICATION_TYPES,
  FETCH_APPLICATION_GENRES
} from '../types';
import {API_ENDPOINTS} from '../../api';
import {HttpInterceptor} from '../../services';
import store from '../store';

const http = new HttpInterceptor();

export const fetchApplications = () => (dispatch) => {
  const endpoint = API_ENDPOINTS.getApplications;
  return http.get(endpoint)
    .then((response) => {
      dispatch({
        type: FETCH_APPLICATIONS,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Applications, fetchApplications()]: HTTP GET - Callback Error', error);
    });
};

export const fetchApplicationTypes = () => (dispatch) => {
  const endpoint = API_ENDPOINTS.getApplicationTypes;
  return http.get(endpoint)
    .then((response) => {
      dispatch({
        type: FETCH_APPLICATION_TYPES,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Applications, fetchApplicationTypes()]: HTTP GET - Callback Error', error);
    });
};

export const fetchApplicationGenres = () => (dispatch) => {
  const endpoint = API_ENDPOINTS.getApplicationGenres;
  return http.get(endpoint)
    .then((response) => {
      dispatch({
        type: FETCH_APPLICATION_GENRES,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Applications, fetchApplicationGenres()]: HTTP GET - Callback Error', error);
    });
};

export const createApplication = body => (dispatch) => {
  const endpoint = API_ENDPOINTS.createApplication;
  return http.post(endpoint, body)
    .then((response) => {
      dispatch({
        type: ADD_APPLICATION,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Applications, createApplication()]: HTTP POST - Callback Error', error);
    });
};

export const editApplication = body => (dispatch) => {
  const endpoint = API_ENDPOINTS.editApplication
    .format(store.getState().applications.editingApplication.id);
  return http.put(endpoint, body)
    .then((response) => {
      dispatch({
        type: EDIT_APPLICATION,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Applications, editApplication()]: HTTP PUT - Callback Error', error);
    });
};

export const deleteApplication = id => (dispatch) => {
  const endpoint = API_ENDPOINTS.deleteApplication
    .format(id);
  return http.delete(endpoint, id)
    .then((response) => {
      dispatch({
        type: DELETE_APPLICATION,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Applications, deleteApplication()]: HTTP DELETE - Callback Error', error);
    });
};

export const updateApplicationSharingStatus = data => (dispatch) => {
  const endpoint = API_ENDPOINTS.updateApplicationSharing
    .format(data.id);
  const body = {
    public_sharing: data.status
  };
  return http.patch(endpoint, body)
    .then((response) => {
      console.log('[INFO]', ' [Applications, updateApplicationSharingStatus()]: HTTP PATCH - Callback Success', response);
      dispatch({
        type: UPDATE_APPLICATION_SHARING_STATUS,
        payload: _.assign({}, data, response.data),
      });
    })
    .catch((error) => {
      console.log('[ERROR]', ' [Applications, updateApplicationSharingStatus()]: HTTP PATCH - Callback Error', error);
    });
};

export const setSelectedApplication = app => (dispatch) => {
  return dispatch({
    type: SET_SELECTED_APPLICATION,
    payload: app,
  });
};

export const setDeletingApplication = app => (dispatch) => {
  return dispatch({
    type: SET_DELETING_APPLICATION,
    payload: app,
  });
};

export const setEditingApplication = app => dispatch => dispatch({
  type: SET_EDITING_APPLICATION,
  payload: app,
});

export const setApplicationViewConfig = config => dispatch => dispatch({
  type: SET_APPLICATION_VIEW_CONFIG,
  payload: config,
});
