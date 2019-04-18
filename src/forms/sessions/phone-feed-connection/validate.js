const validate = values => {
  const errors = {};
  if (!values.url) {
    errors.url = 'Phone connection URL is required';
  }
  return errors;
};

export default validate;
