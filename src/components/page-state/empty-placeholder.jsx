import React from 'react';
import PropTypes from 'prop-types';

const EmptyPlaceholder = (props) => {
  const {title, subTitle, extraContext, icon} = props;
  return (
    <div className="empty-placeholder">
      <img className="icon" src={icon}/>
      <h4 className="main-title">{title}</h4>
      <p className="sub-title">{subTitle}</p>
      { extraContext ? <p className="extra-context">{extraContext}</p> : null }
    </div>
  )
};

EmptyPlaceholder.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

export default EmptyPlaceholder;
