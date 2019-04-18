import { setRawPhoneFeedWSURL } from '../../../redux/actions/session-actions';

function submit(values, dispatch) {
  dispatch(setRawPhoneFeedWSURL(values.url));
}

export default submit;
