import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, FormGroup, ControlLabel
} from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';
import {RenderInput, RenderSelect, RenderToggleSwitch, RenderRadio} from '../../../utils';
import {CustomButton as Button, CustomRadio as Radio} from '../../../elements';
import validate from './validate';
import submit from './submit';

let CreateQuestionnaireForm = (props) => {
  const {
    handleSubmit, submitting, config
  } = props;

  return (
    <form onSubmit={handleSubmit} className="cssi-form mt-2" autoComplete="off">
      {/** 1. General Discomfort **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            1. General Discomfort
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="generalDiscomfort"
                innerLabel="None"
                groupName="generalDiscomfort"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="generalDiscomfort"
                innerLabel="Slight"
                groupName="generalDiscomfort"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="generalDiscomfort"
                innerLabel="Moderate"
                groupName="generalDiscomfort"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="generalDiscomfort"
                innerLabel="Severe"
                groupName="generalDiscomfort"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 2. Fatigue **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            2. Fatigue
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="fatigue"
                innerLabel="None"
                groupName="fatigue"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="fatigue"
                innerLabel="Slight"
                groupName="fatigue"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="fatigue"
                innerLabel="Moderate"
                groupName="fatigue"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="fatigue"
                innerLabel="Severe"
                groupName="fatigue"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 3. Headache **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            3. Headache
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="headache"
                innerLabel="None"
                groupName="headache"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="headache"
                innerLabel="Slight"
                groupName="headache"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="headache"
                innerLabel="Moderate"
                groupName="headache"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="headache"
                innerLabel="Severe"
                groupName="headache"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 4. Eyestrain **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            4. Eyestrain
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="eyestrain"
                innerLabel="None"
                groupName="eyestrain"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="eyestrain"
                innerLabel="Slight"
                groupName="eyestrain"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="eyestrain"
                innerLabel="Moderate"
                groupName="eyestrain"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="eyestrain"
                innerLabel="Severe"
                groupName="eyestrain"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 5. Difficulty Focusing **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            5. Difficulty Focusing
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="difficultyFocusing"
                innerLabel="None"
                groupName="difficultyFocusing"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="difficultyFocusing"
                innerLabel="Slight"
                groupName="difficultyFocusing"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="difficultyFocusing"
                innerLabel="Moderate"
                groupName="difficultyFocusing"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="difficultyFocusing"
                innerLabel="Severe"
                groupName="difficultyFocusing"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 6. Increased Salivation**/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            6. Increased Salivation
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="increasedSalivation"
                innerLabel="None"
                groupName="increasedSalivation"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="increasedSalivation"
                innerLabel="Slight"
                groupName="increasedSalivation"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="increasedSalivation"
                innerLabel="Moderate"
                groupName="increasedSalivation"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="increasedSalivation"
                innerLabel="Severe"
                groupName="increasedSalivation"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 7. Sweating **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            7. Sweating
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="sweating"
                innerLabel="None"
                groupName="sweating"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="sweating"
                innerLabel="Slight"
                groupName="sweating"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="sweating"
                innerLabel="Moderate"
                groupName="sweating"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="sweating"
                innerLabel="Severe"
                groupName="sweating"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 8. Nausea **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            8. Nausea
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="nausea"
                innerLabel="None"
                groupName="nausea"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="nausea"
                innerLabel="Slight"
                groupName="nausea"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="nausea"
                innerLabel="Moderate"
                groupName="nausea"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="nausea"
                innerLabel="Severe"
                groupName="nausea"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 9. Difficulty Concentrating **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            9. Difficulty Concentrating
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="difficultyConcentrating"
                innerLabel="None"
                groupName="difficultyConcentrating"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="difficultyConcentrating"
                innerLabel="Slight"
                groupName="difficultyConcentrating"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="difficultyConcentrating"
                innerLabel="Moderate"
                groupName="difficultyConcentrating"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="difficultyConcentrating"
                innerLabel="Severe"
                groupName="difficultyConcentrating"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 10. Fullness of Head **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            10. Fullness of Head
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="fullnessOfHead"
                innerLabel="None"
                groupName="fullnessOfHead"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="fullnessOfHead"
                innerLabel="Slight"
                groupName="fullnessOfHead"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="fullnessOfHead"
                innerLabel="Moderate"
                groupName="fullnessOfHead"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="fullnessOfHead"
                innerLabel="Severe"
                groupName="fullnessOfHead"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 11. Blurred Vision **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            11. Blurred Vision
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="blurredVision"
                innerLabel="None"
                groupName="blurredVision"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="blurredVision"
                innerLabel="Slight"
                groupName="blurredVision"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="blurredVision"
                innerLabel="Moderate"
                groupName="blurredVision"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="blurredVision"
                innerLabel="Severe"
                groupName="blurredVision"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>
      {/** 12. Dizzy (eyes open) **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            12. Dizzy (eyes open)
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="dizzyEyesOpen"
                innerLabel="None"
                groupName="dizzyEyesOpen"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="dizzyEyesOpen"
                innerLabel="Slight"
                groupName="dizzyEyesOpen"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="dizzyEyesOpen"
                innerLabel="Moderate"
                groupName="dizzyEyesOpen"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="dizzyEyesOpen"
                innerLabel="Severe"
                groupName="dizzyEyesOpen"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 13. Dizzy (eyes closed) **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            13. Dizzy (eyes closed)
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="dizzyEyesClosed"
                innerLabel="None"
                groupName="dizzyEyesClosed"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="dizzyEyesClosed"
                innerLabel="Slight"
                groupName="dizzyEyesClosed"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="dizzyEyesClosed"
                innerLabel="Moderate"
                groupName="dizzyEyesClosed"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="dizzyEyesClosed"
                innerLabel="Severe"
                groupName="dizzyEyesClosed"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 14. Vertigo **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            14. Vertigo
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="vertigo"
                innerLabel="None"
                groupName="vertigo"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="vertigo"
                innerLabel="Slight"
                groupName="vertigo"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="vertigo"
                innerLabel="Moderate"
                groupName="vertigo"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="vertigo"
                innerLabel="Severe"
                groupName="vertigo"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 15. Stomach Awareness **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            15. Stomach Awareness
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="stomachAwareness"
                innerLabel="None"
                groupName="stomachAwareness"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="stomachAwareness"
                innerLabel="Slight"
                groupName="stomachAwareness"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="stomachAwareness"
                innerLabel="Moderate"
                groupName="stomachAwareness"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="stomachAwareness"
                innerLabel="Severe"
                groupName="stomachAwareness"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>

      <br className="clearfix"/>

      {/** 16. Burping **/}
      <Row>
        <Col md={12}>
          <h6 className="text-uppercase group-label mb-3">
            16. Burping
            <span className="star">
                  *
                </span>
          </h6>
          <div className="questionnaire-radio-group">
            <Col md={3}>
              <Field
                name="burping"
                innerLabel="None"
                groupName="burping"
                required
                component={RenderRadio}
                option="0"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="burping"
                innerLabel="Slight"
                groupName="burping"
                required
                component={RenderRadio}
                option="1"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="burping"
                innerLabel="Moderate"
                groupName="burping"
                required
                component={RenderRadio}
                option="2"
                inline
              />
            </Col>
            <Col md={3}>
              <Field
                name="burping"
                innerLabel="Severe"
                groupName="burping"
                required
                component={RenderRadio}
                option="3"
                inline
              />
            </Col>
          </div>
        </Col>
      </Row>
      <br className="clearfix"/>
      <div className="form-footer buttons">
        <Button type="submit" bsStyle="primary" bsSize="sm" disabled={submitting} fullWidth fill>
          Submit
        </Button>
      </div>
    </form>
  );
};

CreateQuestionnaireForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  config: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired
};

CreateQuestionnaireForm = reduxForm({
  form: 'createQuestionnaire',
  enableReinitialize: true,
  initialValues: {
    blurredVision: "0",
    burping: "0",
    difficultyConcentrating: "0",
    difficultyFocusing: "0",
    dizzyEyesClosed: "0",
    dizzyEyesOpen: "0",
    eyestrain: "0",
    fatigue: "0",
    fullnessOfHead: "0",
    generalDiscomfort: "0",
    headache: "0",
    increasedSalivation: "0",
    nausea: "0",
    stomachAwareness: "0",
    sweating: "0",
    vertigo: "0",
  },
  onSubmit: submit,
  validate,
})(CreateQuestionnaireForm);

export default CreateQuestionnaireForm;
