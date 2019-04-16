const validate = (values) => {
  const errors = {};
  if (!values.application) {
    errors.name = 'Please select an application';
  }
  return errors;
};

export default validate;
