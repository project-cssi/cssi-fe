import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { modalReducer } from './modal-reducer';
import { authReducer } from './auth-reducer';
import { dropdownReducer } from './form-dropdown-reducer';
import { loaderReducer } from './loader-reducer';
import { notificationReducer } from './notification-reducer';
import { userReducer } from './user-reducer';
import { applicationReducer } from './application-reducer';
import { sessionReducer } from './session-reducer';

const appReducer = combineReducers({
  form: reduxFormReducer,
  modal: modalReducer,
  auth: authReducer,
  dropdown: dropdownReducer,
  loader: loaderReducer,
  notifications: notificationReducer,
  users: userReducer,
  applications: applicationReducer,
  sessions: sessionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_SIGN_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
