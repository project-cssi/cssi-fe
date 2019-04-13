import constants from '../types';

const initialState = {
  Modal: {
    showModal: false,
    modalKey: '',
  },
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case constants.OPEN_MODAL:
      return Object.assign({}, state, {
        Modal: {
          showModal: true,
          modalKey: action.modalKey,
        },
      });

    case constants.CLOSE_MODAL:
      return Object.assign({}, state, {
        Modal: {
          showModal: false,
          modalKey: action.modalKey,
        },
      });

    default:
      return state;
  }
}
