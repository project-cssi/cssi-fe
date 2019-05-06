import _ from 'lodash';
import {createQuestionnaire, updateQuestionnaire} from '../../../redux/actions/session-actions';

function submit(values, dispatch, props) {
  if (props.config.type === 'pre') {
    let body = {
      pre: {},
      post: {}
    };
    _.assign(body.pre, values);
    dispatch(createQuestionnaire(body));
  } else if (props.config.type === 'post') {
    dispatch(updateQuestionnaire(values, props.config.id));
  }
}

export default submit;
