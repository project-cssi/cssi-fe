import _ from 'lodash';
import {
  ADD_QUESTIONNAIRE,
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
  SET_CAMERA_CONNECTION_STATUS
} from '../types';

const initialState = {
  questionnaires: [],
  newQuestionnaire: {},
  selectedQuestionnaire: {},
  editedQuestionnaire: {},
  sessionViewConfig: {},
  expectedEmotions: [],
  rawPhoneFeedWSURL: 'default',
  rawPhoneFeedWSData: 'default',
  isRawPhoneFeedWSConnected: false,
  isCameraConnected: false,
  availableCameras: [],
  selectedCamera: null
};

export function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONNAIRES:
      return {
        ...state,
        questionnaires: action.payload,
      };
    case ADD_QUESTIONNAIRE:
      return {
        ...state,
        newQuestionnaire: action.payload,
        questionnaires: [...state.applications, action.payload],
      };
    case UPDATE_QUESTIONNAIRE:
      return {
        ...state,
        questionnaires: [..._.filter(state.questionnaires, questionnaire => questionnaire.id !== state.editedQuestionnaire.id),
          action.payload],
      };
    case SET_SELECTED_QUESTIONNAIRE:
      return {
        ...state,
        selectedQuestionnaire: action.payload,
      };
    case SET_EXPECTED_EMOTIONS:
      return {
        ...state,
        expectedEmotions: action.payload,
      };
    case SET_SESSION_VIEW_CONFIG:
      return {
        ...state,
        sessionViewConfig: action.payload,
      };
    case SET_RAW_PHONE_FEED_WS_URL:
      return {
        ...state,
        rawPhoneFeedWSURL: action.payload,
      };
    case SET_RAW_PHONE_FEED_WS_CONNECTION_STATUS:
      return {
        ...state,
        isRawPhoneFeedWSConnected: action.payload,
      };
    case SET_CAMERA_CONNECTION_STATUS:
      return {
        ...state,
        isCameraConnected: action.payload,
      };
    case SET_RAW_PHONE_FEED_WS_DATA:
      return {
        ...state,
        rawPhoneFeedWSData: action.payload,
      };
    case SET_LIST_OF_AVAILABLE_CAMERAS:
      return {
        ...state,
        availableCameras: action.payload,
      };
    case SET_SELECTED_CAMERA:
      return {
        ...state,
        selectedCamera: action.payload,
      };
    default:
      return state;
  }
}
