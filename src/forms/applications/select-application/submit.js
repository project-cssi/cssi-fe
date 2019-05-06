import { setSelectedApplication } from '../../../redux/actions/session-actions';
import { closeModal } from '../../../redux/actions/modal-actions';

const selectApplicationModalKey = 'select-application-modal';

function submit(values, dispatch) {
  dispatch(setSelectedApplication(values.application.value));
  dispatch(closeModal({ modalKey: selectApplicationModalKey }));
}

export default submit;
