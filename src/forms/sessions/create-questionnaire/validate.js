const validate = (values) => {
  const errors = {};
  if (!values.generalDiscomfort) {
    errors.generalDiscomfort = 'Please provide a value';
  }
  if (!values.fatigue) {
    errors.fatigue = 'Please provide a value';
  }
  if (!values.headache) {
    errors.headache = 'Please provide a value';
  }
  if (!values.eyestrain) {
    errors.eyestrain = 'Please provide a value';
  }
  if (!values.difficultyFocusing) {
    errors.difficultyFocusing = 'Please provide a value';
  }
  if (!values.increasedSalivation) {
    errors.increasedSalivation = 'Please provide a value';
  }
  if (!values.sweating) {
    errors.sweating = 'Please provide a value';
  }
  if (!values.nausea) {
    errors.nausea = 'Please provide a value';
  }
  if (!values.difficultyConcentrating) {
    errors.difficultyConcentrating = 'Please provide a value';
  }
  if (!values.fullnessOfHead) {
    errors.fullnessOfHead = 'Please provide a value';
  }
  if (!values.blurredVision) {
    errors.blurredVision = 'Please provide a value';
  }
  if (!values.dizzyEyesOpen) {
    errors.dizzyEyesOpen = 'Please provide a value';
  }
  if (!values.dizzyEyesClosed) {
    errors.dizzyEyesClosed = 'Please provide a value';
  }
  if (!values.vertigo) {
    errors.vertigo = 'Please provide a value';
  }
  if (!values.stomachAwareness) {
    errors.stomachAwareness = 'Please provide a value';
  }
  if (!values.burping) {
    errors.burping = 'Please provide a value';
  }
  return errors;
};

export default validate;
