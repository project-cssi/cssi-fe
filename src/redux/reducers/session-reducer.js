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
  SET_CAMERA_CONNECTION_STATUS,
  SET_SELECTED_APPLICATION,
  INITIALIZE_SESSION,
  SET_SESSION_STATUS,
  SET_CURRENT_SESSION
} from '../types';

const initialState = {
  sessionTemp: {},
  currentSession: {},
  isSessionInitialized: false,
  sessionStatus: 'default',
  questionnaires: [],
  newQuestionnaire: {},
  selectedApplication: {},
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
    case INITIALIZE_SESSION:
      return {
        ...state,
        isSessionInitialized: true,
        sessionTemp: {},
        currentSession: action.payload,
      };
    case SET_CURRENT_SESSION:
      return {
        ...state,
        currentSession: action.payload,
      };
    case SET_SESSION_STATUS:
      return {
        ...state,
        sessionStatus: action.payload,
      };
    case FETCH_QUESTIONNAIRES:
      return {
        ...state,
        questionnaires: action.payload,
      };
    case ADD_QUESTIONNAIRE:
      return {
        ...state,
        newQuestionnaire: action.payload,
        questionnaires: [...state.questionnaires, action.payload],
      };
    case UPDATE_QUESTIONNAIRE:
      return {
        ...state,
        questionnaires: [..._.filter(state.questionnaires, questionnaire => questionnaire.id !== state.editedQuestionnaire.id),
          action.payload],
      };
    case SET_SELECTED_APPLICATION:
      return {
        ...state,
        sessionTemp: _.assign({}, state.sessionTemp, { app: action.payload.id}),
        selectedApplication: action.payload,
      };
    case SET_SELECTED_QUESTIONNAIRE:
      return {
        ...state,
        sessionTemp: _.assign({}, state.sessionTemp, { questionnaire: action.payload.id}),
        selectedQuestionnaire: action.payload,
      };
    case SET_EXPECTED_EMOTIONS:
      return {
        ...state,
        sessionTemp: _.assign({}, state.sessionTemp, { expected_emotions: action.payload}),
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
