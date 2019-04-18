import React from 'react';
import PropTypes from 'prop-types';

const CustomRadio = (props) => {
  const {
    id, label, option, name, inline, additionalClasses, checked, ...rest
  } = props;
  const mainClasses = inline ? 'radio radio-inline':'radio';
  return (
    <div className={mainClasses + ' ' + additionalClasses}>
      <input id={id} name={name} type="radio" value={option} {...rest} checked={checked}/>
      <label htmlFor={id}>
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
  checked: PropTypes.bool.isRequired,
};

export default CustomRadio;
