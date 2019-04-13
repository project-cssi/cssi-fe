import { SHOW_LOADER, HIDE_LOADER } from '../types';

export const showLoader = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADER,
    payload: true,
  });
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADER,
    payload: false,
  });
};
