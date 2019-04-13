import React from 'react';
import PropTypes from 'prop-types';

const ReactLoader = require('react-loaders').Loader;

const MainLoaderSpinner = (props) => {
  const {
    type, active, color, innerClassName,
  } = props;
  return (
    <div className="loader-container">
      <ReactLoader type={type} active={active} color={color} innerClassName={innerClassName} />
    </div>
  );
};

MainLoaderSpinner.defaultProps = {
  color: null,
  innerClassName: null,
};

MainLoaderSpinner.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string,
  innerClassName: PropTypes.string,
};

export default MainLoaderSpinner;
