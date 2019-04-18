import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {RenderSelect} from '../../../utils';
import {CustomButton as Button} from '../../../elements';
import validate from './validate';
import submit from './submit';

let CameraFeedConnectionForm = (props) => {
  const {
    handleSubmit, submitting, cameraTypes
  } = props;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Field
        name="camera"
        placeholder="video-source"
        required
        selectOptions={cameraTypes}
        component={RenderSelect}
      />
      <br className="clearfix" />
      <div className="text-center">
        <Button type="submit" bsStyle="primary" bsSize="sm" wd disabled={submitting}>
          Select
        </Button>
      </div>
    </form>
  );
};

CameraFeedConnectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  cameraTypes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

CameraFeedConnectionForm = reduxForm({
  form: 'cameraFeedConnection',
  onSubmit: submit,
  validate,
})(CameraFeedConnectionForm);

export default CameraFeedConnectionForm;
