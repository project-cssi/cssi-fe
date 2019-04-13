import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import cx from 'classnames';

const CustomButton = (props) => {
  const {
    fill, fillGray, simple, pullRight, block, wd,
    fullWidth, round, icon, neutral, twitter, facebook,
    google, linkedin, pinterest, youtube, tumblr, github,
    behance, dribbble, reddit, stumbleupon, fillSecondary,
    ...rest
  } = props;

  const btnClasses = cx({
    'btn-fill': fill,
    'btn-fill-gray': fillGray,
    'btn-fill-secondary': fillSecondary,
    'btn-simple': simple,
    'pull-right': pullRight,
    'btn-block': block,
    'btn-wd': wd,
    'btn-full-width': fullWidth,
    'btn-round': round,
    'btn-icon': icon,
    'btn-neutral': neutral,
    'btn-social btn-twitter': twitter,
    'btn-social btn-facebook': facebook,
    'btn-social btn-google': google,
    'btn-social btn-linkedin': linkedin,
    'btn-social btn-pinterest': pinterest,
    'btn-social btn-youtube': youtube,
    'btn-social btn-tumblr': tumblr,
    'btn-social btn-github': github,
    'btn-social btn-behance': behance,
    'btn-social btn-dribbble': dribbble,
    'btn-social btn-reddit': reddit,
    'btn-social btn-stumbleupon': stumbleupon,
  });

  return (
    <Button
      className={btnClasses}
      {...rest}
    />
  );
};

CustomButton.defaultProps = {
  fill: false,
  fillGray: false,
  fillSecondary: false,
  simple: false,
  pullRight: false,
  block: false,
  wd: false,
  fullWidth: false,
  round: false,
  icon: false,
  neutral: false,
  twitter: false,
  facebook: false,
  google: false,
  linkedin: false,
  pinterest: false,
  youtube: false,
  tumblr: false,
  github: false,
  behance: false,
  dribbble: false,
  reddit: false,
  stumbleupon: false,
};

CustomButton.propTypes = {
  fill: PropTypes.bool,
  fillGray: PropTypes.bool,
  fillSecondary: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  wd: PropTypes.bool,
  fullWidth: PropTypes.bool,
  round: PropTypes.bool,
  icon: PropTypes.bool,
  neutral: PropTypes.bool,
  twitter: PropTypes.bool,
  facebook: PropTypes.bool,
  google: PropTypes.bool,
  linkedin: PropTypes.bool,
  pinterest: PropTypes.bool,
  youtube: PropTypes.bool,
  tumblr: PropTypes.bool,
  github: PropTypes.bool,
  behance: PropTypes.bool,
  dribbble: PropTypes.bool,
  reddit: PropTypes.bool,
  stumbleupon: PropTypes.bool,
};

export default CustomButton;
