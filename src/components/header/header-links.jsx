import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import defaultAvatarIcon from '../../assets/img/avatars/avatar.svg';
import * as authActionCreators from '../../redux/actions/auth-actions';
import { navigate } from '../../services';

class HeaderLinks extends Component {
  handleUserSignOut = () => {
    const { actions } = this.props;
    const notification = {
      level: 4,
      message: 'Successfully signed out.'
    };
    actions.auth.userSignOut(notification);
  };

  render() {
    const { loggedInUser } = this.props;
    return (
      <div className="pull-right">
        <Dropdown id="dropdown-custom">
          <Dropdown.Toggle>
            <a className="profile-dropdown-toggle">
              <div className="avatar-container">
                <img className="avatar" src={defaultAvatarIcon} alt="" />
              </div>
            </a>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <ul className="profile-dropdown-menu">
              <li className="menu-item">
                <a
                  className="menu-item-link account-details"
                  role="link"
                  tabIndex="0"
                >
                  <div className="avatar-container">
                    <img className="avatar" src={defaultAvatarIcon} alt="" />
                  </div>
                  {loggedInUser && !_.isEmpty(loggedInUser) ? (
                    <div>
                      <div className="name">
                        {loggedInUser.firstName}
                        {loggedInUser.lastName}
                      </div>
                      <div className="username">{loggedInUser.username}</div>
                    </div>
                  ) : null}
                </a>
              </li>
              <li className="menu-item">
                <a
                  className="menu-item-link with-icon"
                  onClick={this.handleUserSignOut}
                  onKeyPress={this.handleUserSignOut}
                  role="link"
                  tabIndex="-1"
                >
                  <i className="icon fa fa-power-off" />
                  Sign out
                </a>
              </li>
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.users.loggedInUser,
    username: state.users.loggedInUserUsername
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: bindActionCreators(authActionCreators, dispatch)
    }
  };
}

const injectedPropTypes = {
  userSignOut: PropTypes.func.isRequired,
  loggedInUser: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string
  }).isRequired
};

HeaderLinks.propTypes = {
  ...injectedPropTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderLinks);
