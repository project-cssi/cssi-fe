import { setSelectedApplication } from '../../../redux/actions/application-actions';
import { closeModal } from '../../../redux/actions/modal-actions';
import validate from './validate';
import store from '../../../redux/store';
import _ from 'lodash';
import {addNotification} from '../../../redux/actions/notification-actions';

const selectApplicationModalKey = 'select-application-modal';

function submit(values, dispatch) {
  // dirty trick to get around the redux form validation issue.
  // TODO: Update redux-form library
  let formErrors = validate(values);

  if (_.isEmpty(formErrors)) {
    dispatch(setSelectedApplication(values.application.value));
    dispatch(closeModal({ modalKey: selectApplicationModalKey }));
  } else {
    let notification = {
      level: 3,
      message: 'Please select an application.',
    };
    store.dispatch(addNotification(notification));
  }
}

export default submit;
