import React from 'react';
import PropTypes from 'prop-types';

const CustomSwitch = (props) => {
  const {
    id, checked, label, onLabel, offLabel, ...rest
  } = props;
  return (
    <div className="toggle-switch-container">
      <div className="toggle-switch">
        <label htmlFor={id}>
          <input id={id} type="checkbox" className="toggle-switch-reader" checked={checked} {...rest} />
          <span className="toggle-switch-track" />
        </label>
      </div>
      <span className="toggle-switch-label">
        {onLabel && offLabel ? checked ? onLabel : offLabel : label}
      </span>
    </div>
  );
};

CustomSwitch.defaultProps = {
  label: null,
  onLabel: null,
  offLabel: null,
};

CustomSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};

export default CustomSwitch;
