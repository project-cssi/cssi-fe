const validate = values => {
  const errors = {};
  if (!values.camera) {
    errors.camera = 'Device selection is required';
  }
  return errors;
};

export default validate;
