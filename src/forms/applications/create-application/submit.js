import { createApplication, editApplication } from '../../../redux/actions/application-actions';
import { closeModal } from '../../../redux/actions/modal-actions';

const createApplicationModalKey = 'create-application-modal';

function submit(values, dispatch, props) {
  const body = {
    name: values.name,
    developer: values.developer,
    type: values.type.value,
    genre: values.genre.value,
    description: values.description,
    public_sharing: values.sharing
  };

  if (props.config && props.config.mode === 'create') dispatch(createApplication(body));
  else if (props.config && props.config.mode === 'edit') dispatch(editApplication(body));
  else dispatch(createApplication(body));

  dispatch(closeModal({ modalKey: createApplicationModalKey }));
}

export default submit;
