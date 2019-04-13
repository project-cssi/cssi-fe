import { SHOW_LOADER, HIDE_LOADER } from '../types';

const initialState = {
  status: false,
};

export function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
    case HIDE_LOADER:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
