import { setSelectedApplication } from '../../../redux/actions/application-actions';
import { closeModal } from '../../../redux/actions/modal-actions';

const selectApplicationModalKey = 'select-application-modal';

function submit(values, dispatch) {
  dispatch(setSelectedApplication(values.application.value));
  dispatch(closeModal({ modalKey: selectApplicationModalKey }));
}

export default submit;
