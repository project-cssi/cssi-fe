import { setSelectedCamera } from '../../../redux/actions/session-actions';

function submit(values, dispatch) {
  console.log(typeof values.camera.value)
  console.log(values.camera.value)
  dispatch(setSelectedCamera(values.camera.value));
}

export default submit;
