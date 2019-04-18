const validate = (values) => {
  const errors = {};
  if (!values.application) {
    errors.application = 'Please select an application';
  }
  return errors;
};

export default validate;
