import React from 'react';

const EmptyPlaceholder = (props) => {
  const {title, subTitle, icon} = props;

  return (
    <div className="empty-placeholder">
      <img className="icon" src={icon}/>
      <h4 className="main-title">{title}</h4>
      <p className="sub-title">{subTitle}</p>
    </div>
  )
};

export default EmptyPlaceholder;
