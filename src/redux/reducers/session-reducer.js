import _ from 'lodash';
import {
  ADD_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRES,
  SET_SESSION_VIEW_CONFIG,
  SET_SELECTED_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE,
  SET_EXPECTED_EMOTIONS
} from '../types';

const initialState = {
  questionnaires: [],
  newQuestionnaire: {},
  selectedQuestionnaire: {},
  editedQuestionnaire: {},
  sessionViewConfig: {},
  expectedEmotions: []
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
    default:
      return state;
  }
}
