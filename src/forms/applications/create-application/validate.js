const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Application name is required';
  }
  if (!values.developer) {
    errors.developer = 'Application developer is required';
  }
  if (!values.type) {
    errors.type = 'Application type is required';
  }
  if (!values.genre) {
    errors.genre = 'Application genre is required';
  }
  if (!values.description) {
    errors.description = 'Application description is required';
  }
  return errors;
};

export default validate;
