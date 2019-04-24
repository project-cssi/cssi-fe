import _ from 'lodash';
import {
  FETCH_QUESTIONNAIRES,
  SET_SESSION_VIEW_CONFIG,
  SET_SELECTED_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE,
  SET_EXPECTED_EMOTIONS,
  SET_RAW_PHONE_FEED_WS_URL,
  SET_RAW_PHONE_FEED_WS_CONNECTION_STATUS,
  SET_RAW_PHONE_FEED_WS_DATA,
  SET_LIST_OF_AVAILABLE_CAMERAS,
  SET_SELECTED_CAMERA,
  SET_CAMERA_CONNECTION_STATUS,
  SET_SELECTED_APPLICATION,
  INITIALIZE_SESSION,
  START_SESSION
} from '../types';
import { API_ENDPOINTS } from '../../api';
import { HttpInterceptor } from '../../services';

const http = new HttpInterceptor();

export const initializeSession = data => dispatch => {
  const endpoint = API_ENDPOINTS.initializeSession;
  return http
    .post(endpoint, data)
    .then(response => {
      dispatch({
        type: INITIALIZE_SESSION,
        payload: response.data.data
      });
    })
    .catch(error => {
      //console.log('[ERROR]', ' [Sessions, createQuestionnaire()]: HTTP POST - Callback Error', error);
    });
};

export const startSession = data => dispatch => {
  dispatch({
    type: START_SESSION,
    payload: data
  });
};

export const setSelectedApplication = app => dispatch => {
  return dispatch({
    type: SET_SELECTED_APPLICATION,
    payload: app
  });
};

export const fetchQuestionnaires = () => dispatch => {
  const endpoint = API_ENDPOINTS.getQuestionnaires;
  return http
    .get(endpoint)
    .then(response => {
      dispatch({
        type: FETCH_QUESTIONNAIRES,
        payload: response.data.data
      });
    })
    .catch(error => {
      //console.log('[ERROR]', ' [Sessions, fetchQuestionnaires()]: HTTP GET - Callback Error', error);
    });
};

export const getQuestionnaireInfo = id => dispatch => {
  const endpoint = API_ENDPOINTS.getQuestionnaireInfo.format(id);
  return http
    .get(endpoint)
    .then(response => {
      dispatch({
        type: SET_SELECTED_QUESTIONNAIRE,
        payload: response.data.data
      });
    })
    .catch(error => {
      // console.log('[ERROR]', ' [Applications, fetchApplications()]: HTTP GET - Callback Error', error);
    });
};

export const createQuestionnaire = data => dispatch => {
  const endpoint = API_ENDPOINTS.createQuestionnaire;
  return http
    .post(endpoint, data)
    .then(response => {
      dispatch({
        type: SET_SELECTED_QUESTIONNAIRE,
        payload: response.data.data
      });
    })
    .catch(error => {
      //console.log('[ERROR]', ' [Sessions, createQuestionnaire()]: HTTP POST - Callback Error', error);
    });
};

export const updateQuestionnaire = data => dispatch => {
  const endpoint = API_ENDPOINTS.updateQuestionnaire.format(data.id);
  const body = {
    post: data.post
  };
  return http
    .patch(endpoint, body)
    .then(response => {
      dispatch({
        type: UPDATE_QUESTIONNAIRE,
        payload: _.assign({}, data, response.data.data)
      });
    })
    .catch(error => {
      //console.log('[ERROR]', ' [Sessions, updateQuestionnaire()]: HTTP PATCH - Callback Error', error);
    });
};

export const setExpectedEmotions = data => dispatch => {
  dispatch({
    type: SET_EXPECTED_EMOTIONS,
    payload: data
  });
};

export const setRawPhoneFeedWSURL = data => dispatch => {
  const endpoint = data + '/wsinfo';
  return http
    .get(endpoint)
    .then(response => {
      dispatch({
        type: SET_RAW_PHONE_FEED_WS_URL,
        payload: response.data
      });
    })
    .catch(error => {
      //console.log('[ERROR]', ' [Sessions, setRawPhoneFeedWSURL()]: HTTP PATCH - Callback Error', error);
    });
};

export const setRawPhoneFeedWSData = data => dispatch => {
  dispatch({
    type: SET_RAW_PHONE_FEED_WS_DATA,
    payload: data
  });
};

export const setRawPhoneFeedWSConnectionStatus = data => dispatch => {
  dispatch({
    type: SET_RAW_PHONE_FEED_WS_CONNECTION_STATUS,
    payload: data
  });
};

export const setCameraConnectionStatus = data => dispatch => {
  dispatch({
    type: SET_CAMERA_CONNECTION_STATUS,
    payload: data
  });
};

export const setListOfAvailableCameras = data => dispatch => {
  dispatch({
    type: SET_LIST_OF_AVAILABLE_CAMERAS,
    payload: data
  });
};

export const setSelectedCamera = data => dispatch => {
  dispatch({
    type: SET_SELECTED_CAMERA,
    payload: data
  });
};

export const setSessionViewConfig = data => dispatch => {
  dispatch({
    type: SET_SESSION_VIEW_CONFIG,
    payload: data
  });
};
