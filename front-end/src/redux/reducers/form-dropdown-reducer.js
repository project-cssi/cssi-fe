import constants from '../types';

const initialState = {
  Dropdown: {
    showDropdown: false,
    dropdownKey: '',
  },
};

export function dropdownReducer(state = initialState, action) {
  switch (action.type) {
    case constants.OPEN_DROPDOWN:
      return Object.assign({}, state, {
        Dropdown: {
          showDropdown: true,
          dropdownKey: action.dropdownKey,
        },
      });

    case constants.CLOSE_DROPDOWN:
      return Object.assign({}, state, {
        Dropdown: {
          showDropdown: false,
          dropdownKey: action.dropdownKey,
        },
      });

    default:
      return state;
  }
}
