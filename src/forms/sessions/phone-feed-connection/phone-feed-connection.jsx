import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {RenderInput} from '../../../utils';
import {CustomButton as Button} from '../../../elements';
import validate from './validate';
import submit from './submit';

let PhoneFeedConnectionForm = (props) => {
  const {
    handleSubmit, submitting
  } = props;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Field
        name="url"
        placeholder="phone-ws-url"
        required
        fieldClass="form-control"
        component={RenderInput}
        type="text"
      />
      <br className="clearfix" />
      <div className="text-center">
        <Button type="submit" bsStyle="primary" bsSize="sm" wd disabled={submitting}>
          Connect
        </Button>
      </div>
    </form>
  );
};

PhoneFeedConnectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

PhoneFeedConnectionForm = reduxForm({
  form: 'phoneFeedConnection',
  onSubmit: submit,
  validate,
})(PhoneFeedConnectionForm);

export default PhoneFeedConnectionForm;
