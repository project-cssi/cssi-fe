import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import * as applicationActionCreators from '../../redux/actions/application-actions';
import * as sessionActionCreators from '../../redux/actions/session-actions';
import * as notificationActionCreators from '../../redux/actions/notification-actions';
import _ from 'lodash';
import * as qs from 'query-string';
import { Card } from '../../components';
import { CreateQuestionnaireForm } from '../../forms';
import { navigate } from '../../services';

class Questionnaire extends Component {
  componentDidMount() {
    const { actions, location, viewConfig, selectedApplication } = this.props;

    const route = qs.parse(location.search);
    let title = null;

    if (route.type) {
      if (route.type === 'pre') {
        title = 'Pre Exposure Questionnaire';
      } else if (route.type === 'post') {
        title = 'Post Exposure Questionnaire';
      }

      const questionnaireViewConfig = {
        id: route.q_id,
        title: title,
        type: route.type
      };
      actions.sessions.setSessionViewConfig(
        _.assign({}, viewConfig, { questionnaire: questionnaireViewConfig })
      );

      // Check if an application is selected. If not show error and redirect to app page.
      if (route.type === 'pre') {
        if (_.isEmpty(selectedApplication)) {
          if (route.app) {
            let appId = route.app;
            actions.applications.getApplicationInfo(appId);
          } else {
            const notification = {
              level: 3,
              message:
                'You have not selected an application. The page will be automatically redirected.'
            };
            actions.notifications.addNotification(notification);
            setTimeout(() => {
              navigate('newSession');
            }, 2000);
          }
        }
      } else if (route.type === 'post') {
        if (!route.session_id) {
          const notification = {
            level: 3,
            message:
              'You have not completed a test session. The page will be automatically redirected.'
          };
          actions.notifications.addNotification(notification);
          setTimeout(() => {
            navigate('newSession');
          }, 2000);
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedQuestionnaire, location, actions } = this.props;

    const route = qs.parse(location.search);

    if (nextProps.selectedQuestionnaire) {
      if (!_.isEqual(selectedQuestionnaire, nextProps.selectedQuestionnaire)) {
        if (route.type === 'pre') {
          let searchParams =
            '?app=' +
            nextProps.selectedApplication.id +
            '&q_id=' +
            nextProps.selectedQuestionnaire.id;
          navigate('emotions', searchParams);
        } else if (route.type === 'post') {
          let searchParams = '?session_id=' + route.session_id;
          actions.sessions.updateSession(route.session_id);
          navigate('sessions', searchParams);
        }
      }
    }
  }

  render() {
    const { viewConfig, selectedApplication } = this.props;

    return (
      <div className="main-content no-padding session-page">
        <Grid fluid>
          <Row>
            <div className="sub-header">
              <h5 className="text-white ml-3">
                Application: {selectedApplication.name}
              </h5>
            </div>
          </Row>
          <div className="main-session-content">
            <Row>
              <Col md={12}>
                <div className="content-description text-center mb-4">
                  <h2>
                    {viewConfig.questionnaire
                      ? viewConfig.questionnaire.title
                      : 'Questionnaire'}
                  </h2>
                  <h5 className="text-muted font-weight-light">
                    Please complete the following questionnaire
                  </h5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} mdOffset={3}>
                <Card
                  title={''}
                  content={
                    <div className="questionnaire-wrapper">
                      <CreateQuestionnaireForm
                        config={
                          viewConfig.questionnaire
                            ? viewConfig.questionnaire
                            : {}
                        }
                      />
                    </div>
                  }
                />
              </Col>
            </Row>
          </div>
        </Grid>
      </div>
    );
  }
}

const injectedPropTypes = {
  actions: PropTypes.shape({})
};

Questionnaire.propTypes = {
  ...injectedPropTypes
};

function mapStateToProps(state) {
  return {
    selectedApplication: state.sessions.selectedApplication,
    selectedQuestionnaire: state.sessions.selectedQuestionnaire,
    viewConfig: state.sessions.sessionViewConfig
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sessions: bindActionCreators(sessionActionCreators, dispatch),
      applications: bindActionCreators(applicationActionCreators, dispatch),
      notifications: bindActionCreators(notificationActionCreators, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questionnaire);
