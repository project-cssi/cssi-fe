import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { RenderSelect } from '../../../utils';
import { CustomButton as Button } from '../../../elements';
import validate from './validate';
import submit from './submit';

let SelectApplicationForm = (props) => {
  const {
    handleSubmit, submitting, config, applications
  } = props;

  return (
    <form onSubmit={handleSubmit} className="cssi-form" autoComplete="off">
      <Row>
        <Col md={12}>
          <Field
            name="application"
            label="Existing Applications"
            placeholder="applications"
            required
            selectOptions={applications}
            component={RenderSelect}
          />
        </Col>
      </Row>
      <br className="clearfix" />
      <div className="form-footer buttons">
        <Button type="submit" bsStyle="primary" bsSize="sm" disabled={submitting} fullWidth fill>
          {config && config.button !== undefined ? config.button : 'Select Application'}
        </Button>
      </div>
    </form>
  );
};

SelectApplicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  config: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
    mode: PropTypes.string,
  }).isRequired,
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired
};

SelectApplicationForm = reduxForm({
  form: 'selectApplication',
  onSubmit: submit,
  enableReinitialize: true,
  validate,
})(SelectApplicationForm);

export default SelectApplicationForm;
