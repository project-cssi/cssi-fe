import React from 'react';
import PropTypes from 'prop-types';

const CustomCheckbox = (props) => {
  const {
    id, label, inline, checked, ...rest
  } = props;
  const classes = inline
    ? 'checkbox checkbox-inline'
    : 'checkbox';
  return (
    <div className={classes}>
      <label htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} {...rest} />
        { label }
      </label>
    </div>
  );
};

CustomCheckbox.defaultProps = {
  label: null,
  inline: false,
};

CustomCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};

export default CustomCheckbox;
