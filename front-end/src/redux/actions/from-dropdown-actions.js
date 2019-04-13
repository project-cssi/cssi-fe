import constants from '../types';

export function openDropdown(obj) {
  return {
    type: constants.OPEN_DROPDOWN,
    dropdownKey: obj.dropdownKey,
    params: obj.params,
  };
}

export function closeDropdown(obj) {
  return {
    type: constants.CLOSE_DROPDOWN,
    dropdownKey: obj.dropdownKey,
  };
}
