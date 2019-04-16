import { createApplication, editApplication } from '../../../redux/actions/application-actions';
import { closeModal } from '../../../redux/actions/modal-actions';

const createApplicationModalKey = 'create-application-modal';

function submit(values, dispatch, props) {
  const body = {
    name: values.name,
    developer: values.developer,
    type: values.type.value.id,
    genre: values.genre.value.id,
    description: values.description,
    public_sharing: values.sharing? values.sharing: false
  };

  if (props.config && props.config.mode === 'create') dispatch(createApplication(body));
  else if (props.config && props.config.mode === 'edit') dispatch(editApplication(body));
  else dispatch(createApplication(body));

  dispatch(closeModal({ modalKey: createApplicationModalKey }));
}

export default submit;
