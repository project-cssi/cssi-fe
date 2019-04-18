import _ from 'lodash';
import {
  ADD_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRES,
  SET_SESSION_VIEW_CONFIG,
  SET_SELECTED_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE,
  SET_EXPECTED_EMOTIONS,
  SET_RAW_PHONE_FEED_WS_URL,
  SET_RAW_PHONE_FEED_WS_CONNECTION_STATUS, SET_RAW_PHONE_FEED_WS_DATA
} from '../types';
import {API_ENDPOINTS} from '../../api';
import {HttpInterceptor} from '../../services';

const http = new HttpInterceptor();

export const fetchQuestionnaires = () => (dispatch) => {
  const endpoint = API_ENDPOINTS.getQuestionnaires;
  return http.get(endpoint)
    .then((response) => {
      dispatch({
        type: FETCH_QUESTIONNAIRES,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      //console.log('[ERROR]', ' [Sessions, fetchQuestionnaires()]: HTTP GET - Callback Error', error);
    });
};

export const createQuestionnaire = data => (dispatch) => {
  const endpoint = API_ENDPOINTS.createQuestionnaire;
  return http.post(endpoint, data)
    .then((response) => {
      dispatch({
        type: ADD_QUESTIONNAIRE,
        payload: response.data.data,
      });
      dispatch(setSelectedQuestionnaire(response.data.data))
    })
    .catch((error) => {
      //console.log('[ERROR]', ' [Sessions, createQuestionnaire()]: HTTP POST - Callback Error', error);
    });
};

export const updateQuestionnaire = data => (dispatch) => {
  const endpoint = API_ENDPOINTS.updateQuestionnaire
    .format(data.id);
  const body = {
    post: data.post
  };
  return http.patch(endpoint, body)
    .then((response) => {
      dispatch({
        type: UPDATE_QUESTIONNAIRE,
        payload: _.assign({}, data, response.data.data),
      });
    })
    .catch((error) => {
      //console.log('[ERROR]', ' [Sessions, updateQuestionnaire()]: HTTP PATCH - Callback Error', error);
    });
};

export const setSelectedQuestionnaire = data => (dispatch) => {
  return dispatch({
    type: SET_SELECTED_QUESTIONNAIRE,
    payload: data,
  });
};

export const setExpectedEmotions = data => (dispatch) => {
  return dispatch({
    type: SET_EXPECTED_EMOTIONS,
    payload: data,
  });
};

export const setRawPhoneFeedWSURL = data => (dispatch) => {
  const endpoint = data + '/wsinfo';
  return http.get(endpoint)
    .then((response) => {
      return dispatch({
        type: SET_RAW_PHONE_FEED_WS_URL,
        payload: response.data,
      });
    })
    .catch((error) => {
      //console.log('[ERROR]', ' [Sessions, setRawPhoneFeedWSURL()]: HTTP PATCH - Callback Error', error);
    });
};

export const setRawPhoneFeedWSData = data => (dispatch) => {
  return dispatch({
    type: SET_RAW_PHONE_FEED_WS_DATA,
    payload: data,
  });
};

export const setRawPhoneFeedWSConnectionStatus = data => (dispatch) => {
  return dispatch({
    type: SET_RAW_PHONE_FEED_WS_CONNECTION_STATUS,
    payload: data,
  });
};

export const setSessionViewConfig = data => dispatch => dispatch({
  type: SET_SESSION_VIEW_CONFIG,
  payload: data,
});
