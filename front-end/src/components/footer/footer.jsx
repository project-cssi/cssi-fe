import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => {
  const { transparent, fluid } = props;
  return (
    <footer className={`footer${transparent ? ' footer-transparent' : ''}`}>
      <div className={`container-fluid${fluid ? '-fluid' : ''}`}>
        {
          <p className="copyright">
            &copy; {1900 + new Date().getYear()}
            &ensp; CSSI. All rights reserved.
          </p>
        }
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  transparent: false,
  fluid: false
};

Footer.propTypes = {
  transparent: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
