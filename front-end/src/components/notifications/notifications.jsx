import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import _ from 'lodash';
import * as styles from '../../variables';
import * as notificationActionCreators from '../../redux/actions/notification-actions';

class Notifications extends Component {
  componentDidMount() {
    this.props.actions.notifications.initialize(this.refs.notificationSystem);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification && !_.isEmpty(nextProps.notification)) {
      if (this.props.notificationSystem) {
        let level;
        let title;
        switch (nextProps.notification.level) {
          case 1: {
            title = (<span data-notify="icon" className="fa fa-check" />);
            level = 'success';
            break;
          }
          case 2: {
            title = (<span data-notify="icon" className="fa fa-warning" />);
            level = 'warning';
            break;
          }
          case 3: {
            title = (<span data-notify="icon" className="fa fa-exclamation-circle" />);
            level = 'error';
            break;
          }
          case 4: {
            title = (<span data-notify="icon" className="fa fa-info" />);
            level = 'info';
            break;
          }
          default:
            break;
        }
        const notification = {
          title,
          message: (
            <div>
              {nextProps.notification.message}
            </div>
          ),
          level,
          position: 'br',
          autoDismiss: 5,
        };
        this.props.notificationSystem.addNotification(notification);
      }
    }
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" style={styles.notificationStyles} />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notifications.notification,
    notificationSystem: state.notifications.notificationSystem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      notifications: bindActionCreators(notificationActionCreators, dispatch),
    },
  };
}

const injectedPropTypes = {
  initialize: PropTypes.func.isRequired,
  notificationSystem: PropTypes.shape({}).isRequired,
};

Notifications.propTypes = {
  ...injectedPropTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
