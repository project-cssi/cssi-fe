import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { RenderInput } from '../../../utils/index';
import { CustomButton as Button } from '../../../elements/index';
import validate from './validate';
import submit from './submit';

let LoginForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Field
        name="username"
        label="Email"
        placeholder="Email Address"
        required
        fieldClass="form-control"
        component={RenderInput}
        type="text"
      />
      <Field
        name="password"
        label="Password"
        placeholder="Password"
        required
        fieldClass="form-control"
        component={RenderInput}
        type="password"
      />
      <br className="clearfix" />
      <div className="text-center">
        <Button type="submit" bsStyle="primary" bsSize="sm" wd fill disabled={submitting}>
          LOGIN
        </Button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

LoginForm = reduxForm({
  form: 'login',
  initialValues: {},
  onSubmit: submit,
  validate,
})(LoginForm);

export default LoginForm;
