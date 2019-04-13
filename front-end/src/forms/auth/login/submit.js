import sha256 from 'sha256';
import { userLogIn } from '../../../redux/actions/auth-actions';

function submit(values, dispatch) {
  const body = JSON.stringify({
    username: values.username,
    hashedPassword: sha256(values.password),
  });

  dispatch(userLogIn(body));
}

export default submit;
