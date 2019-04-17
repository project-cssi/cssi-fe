import _ from 'lodash';
import {
  ADD_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRES,
  SET_SESSION_VIEW_CONFIG,
  SET_SELECTED_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE,
  SET_EXPECTED_EMOTIONS
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
      console.log('[ERROR]', ' [Questionnaires, fetchQuestionnaires()]: HTTP GET - Callback Error', error);
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
      console.log('[ERROR]', ' [Questionnaires, createQuestionnaire()]: HTTP POST - Callback Error', error);
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
      console.log('[ERROR]', ' [Questionnaires, updateQuestionnaire()]: HTTP PATCH - Callback Error', error);
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

export const setSessionViewConfig = data => dispatch => dispatch({
  type: SET_SESSION_VIEW_CONFIG,
  payload: data,
});
