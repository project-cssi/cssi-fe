import { setSelectedApplication } from '../../../redux/actions/application-actions';
import { closeModal } from '../../../redux/actions/modal-actions';

const selectApplicationModalKey = 'select-application-modal';

function submit(values, dispatch, props) {
  const body = {
    name: values.name,
    developer: values.developer,
    type: values.type.value,
    genre: values.genre.value,
    description: values.description,
    public_sharing: values.sharing
  };

  dispatch(setSelectedApplication(body));

  dispatch(closeModal({ modalKey: selectApplicationModalKey }));
}

export default submit;
