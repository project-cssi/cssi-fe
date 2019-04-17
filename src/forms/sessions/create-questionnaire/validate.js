const validate = (values) => {
  const errors = {};
  if (!values.generalDiscomfort) {
    errors.name = 'Please provide a value';
  }
  if (!values.fatigue) {
    errors.name = 'Please provide a value';
  }
  if (!values.headache) {
    errors.name = 'Please provide a value';
  }
  if (!values.eyestrain) {
    errors.name = 'Please provide a value';
  }
  if (!values.difficultyFocusing) {
    errors.name = 'Please provide a value';
  }
  if (!values.increasedSalivation) {
    errors.name = 'Please provide a value';
  }
  if (!values.sweating) {
    errors.name = 'Please provide a value';
  }
  if (!values.nausea) {
    errors.name = 'Please provide a value';
  }
  if (!values.difficultyConcentrating) {
    errors.name = 'Please provide a value';
  }
  if (!values.fullnessOfHead) {
    errors.name = 'Please provide a value';
  }
  if (!values.blurredVision) {
    errors.name = 'Please provide a value';
  }
  if (!values.dizzyEyesOpen) {
    errors.name = 'Please provide a value';
  }
  if (!values.dizzyEyesClosed) {
    errors.name = 'Please provide a value';
  }
  if (!values.vertigo) {
    errors.name = 'Please provide a value';
  }
  if (!values.stomachAwareness) {
    errors.name = 'Please provide a value';
  }
  if (!values.burping) {
    errors.name = 'Please provide a value';
  }
  return errors;
};

export default validate;
