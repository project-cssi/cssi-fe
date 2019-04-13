import React from 'react';
import PropTypes from 'prop-types';

const CustomRadio = (props) => {
  const {
    id, label, option, name, inline, ...rest
  } = props;

  return (
    <div className={inline ? 'radio custom-radio-inline' : 'radio'}>
      <label htmlFor={id}>
        <input id={id} name={name} type="radio" value={option} {...rest} />
        {label}
      </label>
    </div>
  );
};

CustomRadio.defaultProps = {
  label: null,
  inline: false,
};

CustomRadio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  option: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
};

export default CustomRadio;
