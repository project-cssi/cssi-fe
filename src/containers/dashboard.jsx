import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DashboardRoutes} from '../routes';
import * as userActionCreators from '../redux/actions/user-actions';
import {
  MainLoaderSpinner,
  Notifications,
  Sidebar,
  Header,
  Footer,
  Restricted,
} from '../components';
import {getCookie, validateCookie} from '../services';
import {canActivate} from '../utils';

class Dashboard extends Component {
  componentDidMount() {
    const {actions} = this.props;
    if (validateCookie()) {
      //actions.users.setLoggedInUser(getCookie().username);
      //actions.users.setLoggedInUserUsername(getCookie().username);
    }
  }

  render() {
    const {loaderStatus, loggedInUser} = this.props;
    return (
      <div className="wrapper">
        <Notifications/>
        <MainLoaderSpinner active={loaderStatus} type="ball-beat"/>
        <Sidebar {...this.props} />
        <div className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {
              DashboardRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return prop.views.map((innerProp, key) => {
                    if(prop.exact) {
                      return (<Route
                        path={prop.path}
                        render={() => (canActivate(loggedInUser, prop.restrictionLevel)
                          ? <prop.component {...this.props} />
                          : <Restricted/>)}
                        key={key}
                        exact
                      />);
                    }
                    return (<Route
                      path={prop.path}
                      render={() => (canActivate(loggedInUser, prop.restrictionLevel)
                        ? <prop.component {...this.props} />
                        : <Restricted/>)}
                      key={key}
                    />);
                  });
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                  );
                }
                if (prop.exact) {
                  return (
                    <Route
                      path={prop.path}
                      render={() => (canActivate(loggedInUser, prop.restrictionLevel)
                        ? <prop.component {...this.props} />
                        : <Restricted/>)
                      }
                      key={key}
                      exact
                    />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    render={() => (canActivate(loggedInUser, prop.restrictionLevel)
                      ? <prop.component {...this.props} />
                      : <Restricted/>)
                    }
                    key={key}
                  />
                );
              })
            }
          </Switch>
          <Footer {...this.props} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
    loaderStatus: state.loader.status,
    username: state.users.loggedInUserUsername,
    loggedInUser: state.users.loggedInUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      users: bindActionCreators(userActionCreators, dispatch),
    },
  };
}

const injectedPropTypes = {
  loaderStatus: PropTypes.bool.isRequired,
  setLoggedInUser: PropTypes.func,
  setLoggedInUserUsername: PropTypes.func,
};

Dashboard.propTypes = {
  ...injectedPropTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
