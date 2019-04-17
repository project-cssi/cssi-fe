import _ from 'lodash';
import validate from './validate';
import store from '../../../redux/store';
import {addNotification} from '../../../redux/actions/notification-actions';
import {createQuestionnaire} from '../../../redux/actions/questionnaire-actions';

function submit(values, dispatch, props) {
  // dirty trick to get around the redux form validation issue.
  // TODO: Update redux form library
  let formErrors = validate(values);
  let body = {
    pre: {},
    post: {}
  };

  if (_.isEmpty(formErrors)) {
    if (props.config.type === 'pre') {
      _.assign(body.pre, values)
      dispatch(createQuestionnaire(body));
    } else if (props.config.type === 'post') {
      _.assign(body.post, values)
    }
  } else {
    let notification = {
      level: 3,
      message: 'Some form values appear to be empty.',
    };
    store.dispatch(addNotification(notification));
  }
}

export default submit;
