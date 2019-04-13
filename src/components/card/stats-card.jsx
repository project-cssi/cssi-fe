import React from 'react';
import PropTypes from 'prop-types';

const StatsCard = (props) => {
  const {
    icon, statsText, statsValue, footerIcon, footerText,
  } = props;
  return (
    <div className="card card-stats">
      <div className="content">
        <div className="row">
          <div className="col-xs-5">
            <div className="icon-big text-center icon-warning">
              {icon}
            </div>
          </div>
          <div className="col-xs-7">
            <div className="numbers">
              <p>
                {statsText}
              </p>
              {statsValue}
            </div>
          </div>
        </div>
      </div>
      {
        (footerIcon) || (footerText)
          ? (
            <div className="footer">
              <hr />
              <div className="stats">
                {footerIcon}
                {' '}
                {footerText}
              </div>
            </div>
          )
          : null
      }
    </div>
  );
};

StatsCard.defaultProps = {
  footerIcon: null,
  footerText: null,
};

StatsCard.propTypes = {
  icon: PropTypes.element.isRequired,
  statsText: PropTypes.string.isRequired,
  statsValue: PropTypes.string.isRequired,
  footerIcon: PropTypes.element,
  footerText: PropTypes.string,
};

export default StatsCard;
