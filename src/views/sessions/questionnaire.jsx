import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import * as applicationActionCreators from '../../redux/actions/application-actions';
import * as questionnaireActionCreators from '../../redux/actions/questionnaire-actions';
import _ from 'lodash';
import * as qs from 'query-string';
import {
  Card
} from '../../components';
import {CustomButton as Button} from '../../elements'
import {CreateQuestionnaireForm} from '../../forms';

class Questionnaire extends Component {

  componentDidMount() {
    const {actions, location} = this.props;

    const route = qs.parse(location.search);
    let title = null;

    if(route.type) {
      if (route.type === 'pre') {
        title = 'Pre Exposure Questionnaire';
      } else if (route.type === 'post') {
        title = 'Post Exposure Questionnaire';
      }
    }

    const config = {
      title: title,
      type: route.type,
    };
    actions.questionnaires.setQuestionnaireViewConfig(config);
  }

  handleQuestionnaireSubmit = (e) => {
    const {actions} = this.props;
    const config = {
      title: 'Create New Application',
      button: 'Create Application',
      mode: 'create',
    };
    actions.questionnaires.setQuestionnaireViewConfig(config);
    this.openModal(e);
  };

  render() {
    const {
      actions, modal, viewConfig, editingApplication, selectedApplication
    } = this.props;

    return (
      <div className="main-content no-padding questionnaire-page">
        <Grid fluid>
          <Row>
            <div className="sub-header">
              <h5 className="text-white ml-3">Application: { selectedApplication.name }</h5>
            </div>
          </Row>
          <Row>
            <Col md={12}>
              <div className="content-description text-center mb-4">
                <h2>{ viewConfig.title }</h2>
                <h5 className="text-muted font-weight-light">Please complete the following questionnaire</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdOffset={3}>
              <Card
                title={''}
                content={(
                  <div className="questionnaire-wrapper">
                    <CreateQuestionnaireForm config={{ type: 'pre' }}/>
                  </div>
                )}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const injectedPropTypes = {
  actions: PropTypes.shape({}),
};

Questionnaire.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    selectedApplication: state.applications.selectedApplication,
    viewConfig: state.questionnaires.questionnaireViewConfig,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      questionnaires: bindActionCreators(questionnaireActionCreators, dispatch),
      applications: bindActionCreators(applicationActionCreators, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
