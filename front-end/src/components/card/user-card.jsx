import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatarIcon from '../../assets/img/avatars/avatar.svg';

const UserCard = props => {
  const {
    backgroundCover,
    name,
    userName,
    avatar,
    avatarLink,
    description,
    extra
  } = props;
  return (
    <div className="card card-user">
      <div className="image">
        {backgroundCover ? (
          <img src={backgroundCover} alt="user-avatar" />
        ) : null}
      </div>
      <div className="content">
        <div className="author">
          <a href={avatarLink}>
            <img className="avatar border-gray" src={avatar} alt="..." />
            <h4 className="title">
              {name}
              <br />
              <small>{userName}</small>
            </h4>
          </a>
        </div>
        <p className="description text-center">{description}</p>
      </div>
      <hr />
      <div className="text-center">{extra}</div>
    </div>
  );
};

UserCard.defaultProps = {
  backgroundCover: null,
  avatar: defaultAvatarIcon,
  avatarLink: '#',
  description: null,
  extra: null
};

UserCard.propTypes = {
  backgroundCover: PropTypes.string,
  name: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  avatarLink: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  extra: PropTypes.element
};

export default UserCard;
