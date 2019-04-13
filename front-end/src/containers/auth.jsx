import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthRoutes } from '../routes';
import {
  MainLoaderSpinner,
  Notifications,
} from '../components';

class Auth extends Component {
  componentWillMount() {
    if (document.documentElement.className.indexOf('nav-open') !== -1) {
      document.documentElement.classList.toggle('nav-open');
    }
  }

  getPageClass() {
    const { location } = this.props;
    let pageClass = '';
    if (location.pathname === '/login') {
      pageClass = ' login-page';
    } else {
      pageClass = '';
    }
    return pageClass;
  }

  render() {
    const { loaderStatus } = this.props;
    return (
      <div className="wrapper wrapper-full-page">
        <Notifications />
        <MainLoaderSpinner active={loaderStatus} type="ball-beat" />
        <div className={`full-page${this.getPageClass()}`} data-color="white">
          <div className="content">
            <Switch>
              {
                AuthRoutes.map((prop, key) => (
                  <Route path={prop.path} component={prop.component} key={key} />
                ))
              }
            </Switch>
          </div>
          <div className="full-page-background" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loaderStatus: state.loader.status,
  };
}

const injectedPropTypes = {
  loaderStatus: PropTypes.bool.isRequired,
};

Auth.propTypes = {
  ...injectedPropTypes,
};

export default connect(mapStateToProps)(Auth);
