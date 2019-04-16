import _ from 'lodash';
import {
  FETCH_APPLICATIONS,
  ADD_APPLICATION,
  EDIT_APPLICATION,
  DELETE_APPLICATION,
  SET_EDITING_APPLICATION,
  SET_DELETING_APPLICATION,
  SET_APPLICATION_VIEW_CONFIG,
  UPDATE_APPLICATION_SHARING_STATUS
} from '../types';

const initialState = {
  applications: [],
  newApplication: {},
  editedApplication: {},
  editingApplication: {},
  deletingApplication: {},
  applicationViewConfig: {}
};

export function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
      };
    case ADD_APPLICATION:
      return {
        ...state,
        newApplication: action.payload,
        applications: [...state.applications, action.payload],
      };
    case EDIT_APPLICATION:
      return {
        ...state,
        editedApplication: action.payload,
        applications: [..._.filter(state.applications, application => application.id !== state.editedApplication.id),
          action.payload],
      };
    case UPDATE_APPLICATION_SHARING_STATUS:
      return {
        ...state,
        applications: [..._.filter(state.applications, application => application.id !== state.editedApplication.id),
          action.payload],
      };
    case DELETE_APPLICATION:
      return {
        ...state,
        applications: [..._.filter(state.applications, application => application.id !== state.deletingApplication.id)],
      };
    case SET_EDITING_APPLICATION:
      return {
        ...state,
        editedApplication: action.payload,
      };
    case SET_DELETING_APPLICATION:
      return {
        ...state,
        deletingApplication: action.payload,
      };
    case SET_APPLICATION_VIEW_CONFIG:
      return {
        ...state,
        applicationViewConfig: action.payload,
      };
    default:
      return state;
  }
}
