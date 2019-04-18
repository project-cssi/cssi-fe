import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import * as sessionActionCreators from '../../redux/actions/session-actions';
import {Card} from '../../components';
import {CustomButton as Button} from '../../elements';
import {PhoneFeedConnectionForm} from '../../forms'

class Evaluation extends Component {

  componentWillReceiveProps(nextProps) {
    const {rawPhoneFeedWSURL} = this.props;
    if (rawPhoneFeedWSURL && nextProps.rawPhoneFeedWSURL) {
      if (rawPhoneFeedWSURL !== nextProps.rawPhoneFeedWSURL) {
        this.runWebSocket(nextProps.rawPhoneFeedWSURL);
      }
    }
  }

  runWebSocket = (address) => {
    const {actions, rawPhoneFeedWSData} = this.props;
    let ws;

    if ('WebSocket' in window) {
      console.log('WebSocket is supported by your Browser!');

      ws = new WebSocket('ws://' + address);
      ws.onopen = function () {
        // Web Socket is connected, send data using send()
        ws.send('Message to send\n');
        console.log('Message is sent...');
      };

      ws.onmessage = function (evt) {
        console.log('ws message received', evt.data);
        actions.sessions.setRawPhoneFeedWSData(evt.data);
      };
      ws.onclose = function () {
        // websocket is closed.
        console.log('Connection is closed...');
      };
    }
    else {
      // The browser doesn't support WebSocket
      alert('WebSocket NOT supported by your Browser!');
    }
  }

  render() {
    const {isRawPhoneFeedWSConnected, rawPhoneFeedWSData} = this.props;
    return (
      <div className="main-content no-padding session-page">
        <Grid fluid>
          <Row>
            <div className="sub-header">
              <h5 className="text-white ml-3">Application</h5>
            </div>
          </Row>
          <div className="main-session-content">
            <Row>
              <Col md={6} mdOffset={3}>
                <div className="content-description text-center mb-4">
                  <h2>Start Session</h2>
                  <h5 className="text-muted font-weight-light">
                    Before starting the session make sure your camera and mobile screen feed is working properly.
                    Configure them properly and press the Start button to start the session.
                  </h5>
                </div>
              </Col>
            </Row>
            <div className="feed-wrapper">
              <Row>
                <Col lg={4} md={6} sm={12}>
                  <Card
                    title={''}
                    content={(
                      <div className="phone-feed-wrapper">
                        <div className="phone-feed-container text-center">
                          <img src={'data:image/jpg;base64,' + rawPhoneFeedWSData}/>
                        </div>
                        <PhoneFeedConnectionForm/>
                      </div>
                    )}
                  />
                </Col>
                <Col lg={8} md={6} sm={12}>
                  <Card
                    title={''}
                    content={(
                      <div className="questionnaire-wrapper">

                      </div>
                    )}
                  />
                </Col>
              </Row>
            </div>
          </div>
          <Row>
            <Col md={12}>
              <div className="text-center mt-2">
                <Button type="submit" bsStyle="primary" bsSize="sm" wd fill>
                  Select
                </Button>
              </div>
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

Evaluation.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    isRawPhoneFeedWSConnected: state.sessions.isRawPhoneFeedWSConnected,
    rawPhoneFeedWSURL: state.sessions.rawPhoneFeedWSURL,
    rawPhoneFeedWSData: state.sessions.rawPhoneFeedWSData,
    viewConfig: state.sessions.sessionViewConfig,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sessions: bindActionCreators(sessionActionCreators, dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Evaluation);
