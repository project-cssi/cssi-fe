import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { RenderInput, RenderSelect, RenderToggleSwitch } from '../../../utils';
import { CustomButton as Button } from '../../../elements';
import validate from './validate';
import submit from './submit';

let CreateApplicationForm = (props) => {
  const {
    handleSubmit, submitting, config, applicationTypes, genreTypes
  } = props;

  return (
    <form onSubmit={handleSubmit} className="cssi-form" autoComplete="off">
      <Row>
        <Col md={6}>
          <Field
            name="name"
            label="Application Name"
            placeholder="app-name"
            required
            fieldClass="form-control"
            component={RenderInput}
            type="text"
          />
        </Col>
        <Col md={6}>
          <Field
            name="developer"
            label="Developer"
            placeholder="app-developer"
            required
            fieldClass="form-control"
            component={RenderInput}
            type="text"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Field
            name="type"
            label="Application Type"
            placeholder="app-type"
            required
            selectOptions={applicationTypes}
            component={RenderSelect}
          />
        </Col>
        <Col md={6}>
          <Field
            name="genre"
            label="Genre Type"
            placeholder="app-genre"
            required
            selectOptions={genreTypes}
            component={RenderSelect}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Field
            name="description"
            label="Description"
            placeholder="app-description"
            required
            fieldClass="form-control"
            component={RenderInput}
            type="text"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Field
            name="sharing"
            label="Public Sharing"
            onLabel="Enabled"
            offLabel="Disabled"
            component={RenderToggleSwitch}
          />
        </Col>
      </Row>
      <br className="clearfix" />
      <div className="form-footer buttons">
        <Button type="submit" bsStyle="primary" bsSize="sm" disabled={submitting} fullWidth fill>
          {config && config.button !== undefined ? config.button : 'Create Application'}
        </Button>
      </div>
    </form>
  );
};

CreateApplicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  config: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
    mode: PropTypes.string,
  }).isRequired,
  applicationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  genreTypes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired
};

CreateApplicationForm = reduxForm({
  form: 'createApplication',
  onSubmit: submit,
  enableReinitialize: true,
  validate,
})(CreateApplicationForm);

export default CreateApplicationForm;
