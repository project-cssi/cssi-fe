import _ from 'lodash';
import {createQuestionnaire} from '../../../redux/actions/session-actions';

function submit(values, dispatch, props) {
  let body = {
    pre: {},
    post: {}
  };

  if (props.config.type === 'pre') {
    _.assign(body.pre, values);
    dispatch(createQuestionnaire(body));
  } else if (props.config.type === 'post') {
    _.assign(body.post, values)
  }
}

export default submit;
