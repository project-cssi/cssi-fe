import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { DashboardRoutes } from '../../routes';
import logo from '../../assets/img/logos/cssi-logo.svg';
import dashboard from '../../assets/img/logos/cssi-logo-dashboard-text-only-white.svg';
import { canActivate } from '../../utils';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openUsers: this.activeRoute('/users') !== '',
      isWindows: navigator.platform.indexOf('Win') > -1,
      width: window.innerWidth
    };
    document.body.classList.add('sidebar-mini');
  }

  componentDidMount() {
    this.updateDimensions();
    // add event listener for windows resize
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    const { location } = this.props;
    const urlTokens = routeName.split('/');
    return location.pathname.indexOf(urlTokens[1]) > -1 ? 'active' : '';
  }

  // if the windows width changes CSS has to make some changes
  // this functions tell react what width is the window
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { settings, loggedInUser } = this.props;
    return (
      <div className="sidebar">
        <div className="logo">
          <a className="brand-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="cssi" />
            </div>
          </a>
          <a className="brand-text logo-normal">
            <div className="logo-img">
              <img src={dashboard} alt="dashboard" />
            </div>
          </a>
        </div>
        <div
          className="sidebar-wrapper"
          id="custom-scroll"
          ref="sidebarWrapper"
        >
          {/* <div className="user">
            <div className="photo">
              <img src={ avatar } alt="Avatar"/>
            </div>
            <div className="info">
              <a onClick={ () => this.setState({openAvatar: !this.state.openAvatar}) }>
                <span>{ this.username }</span>
              </a>
            </div>
          </div> */}
          <ul className="nav">
            {DashboardRoutes.map((prop, key) => {
              const st = {};
              st[prop.state] = !this.state[prop.state];
              if (prop.collapse) {
                if (prop.hide) {
                  return null;
                }
                return canActivate(loggedInUser, prop.restrictionLevel) ? (
                  <li className={this.activeRoute(prop.path)} key={key}>
                    <a onClick={() => this.setState(st)}>
                      <img src={prop.icon} />
                      <span className="mini-link-title visible-on-sidebar-mini">
                        {prop.name}
                      </span>
                      <p className="visible-on-sidebar-regular">{prop.name}</p>
                      {prop.hideArrow ? null : (
                        <i
                          className={
                            this.state[prop.state]
                              ? 'visible-on-sidebar-regular fa fa-angle-left collapse-arrow rotate'
                              : 'visible-on-sidebar-regular fa fa-angle-left collapse-arrow'
                          }
                        />
                      )}
                    </a>
                    <Collapse in={this.state[prop.state]}>
                      <ul className="sub-nav">
                        {prop.views.map((innerProp, key) => {
                          if (innerProp.hide) {
                            return null;
                          }

                          return (
                            <li
                              className={this.activeRoute(innerProp.path)}
                              key={key}
                            >
                              <NavLink
                                to={innerProp.path}
                                className="nav-link"
                                activeClassName="active"
                              >
                                <i
                                  className={`${
                                    innerProp.icon
                                  } visible-on-sidebar-regular`}
                                />
                                <span className="mini-sub-link-title visible-on-sidebar-mini">
                                  {innerProp.mini}
                                </span>
                                <span className="sidebar-normal visible-on-sidebar-regular">
                                  {innerProp.name}
                                </span>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                  </li>
                ) : null;
              }
              if (prop.redirect) {
                return null;
              }
              if (prop.hide) {
                return null;
              }

              return canActivate(loggedInUser, prop.restrictionLevel) ? (
                <li className={this.activeRoute(prop.path)} key={key}>
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <img src={prop.icon} />
                    <span className="mini-link-title visible-on-sidebar-mini">
                      {prop.name}
                    </span>
                    <p className="visible-on-sidebar-regular">{prop.name}</p>
                  </NavLink>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({
    companyName: PropTypes.string,
    companyType: PropTypes.string,
    companyBrand: PropTypes.string,
    companySlogan: PropTypes.string,
    companyLogo: PropTypes.string,
    companyAddress: PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string,
      country: PropTypes.string
    }),
    contactInfo: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    taxes: PropTypes.shape({
      type: PropTypes.string,
      percentage: PropTypes.string
    }),
    currency: PropTypes.string,
    terms: PropTypes.string
  }).isRequired,
  loggedInUser: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string
  }).isRequired
};

export default Sidebar;
