import _ from 'lodash';
import {
  ADD_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRES,
  SET_QUESTIONNAIRE_VIEW_CONFIG,
  SET_SELECTED_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE
} from '../types';

const initialState = {
  questionnaires: [],
  newQuestionnaire: {},
  selectedQuestionnaire: {},
  editedQuestionnaire: {},
  questionnaireViewConfig: {}
};

export function questionnaireReducer(state = initialState, action) {
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
    case SET_QUESTIONNAIRE_VIEW_CONFIG:
      return {
        ...state,
        questionnaireViewConfig: action.payload,
      };
    default:
      return state;
  }
}
