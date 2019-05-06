import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import io from 'socket.io-client';
import {Grid, Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import * as sessionActionCreators from '../../redux/actions/session-actions';
import * as notificationActionCreators from '../../redux/actions/notification-actions';
import {Card} from '../../components';
import {CustomButton as Button} from '../../elements';
import {PhoneFeedConnectionForm} from '../../forms';
import {CameraFeedConnectionForm} from '../../forms/sessions';
import {EmptyPlaceholder} from '../../components';
import videoCameraIcon from '../../assets/img/icons/video-camera.svg';
import phoneIcon from '../../assets/img/icons/smartphone.svg';
import * as qs from 'query-string';
import {navigate} from '../../services';

const WEBSOCKET_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_WEBSOCKET_ENDPOINT
    : process.env.REACT_APP_DEV_WEBSOCKET_ENDPOINT;

// Variable for the screen-share web-socket connection (javascript)
let ws;

// Variable for the CSSI api web-socket connection (scoket-io)
let socket;

class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSessionStarted: false
    }
  }

  componentDidMount() {
    const {actions, currentSession, location} = this.props;

    if (_.isEmpty(currentSession)) {
      const route = qs.parse(location.search);
      actions.sessions.getSessionInfo(route.session_id);
    }
    actions.sessions.setCameraConnectionStatus(false);
    actions.sessions.setRawPhoneFeedWSConnectionStatus(false);
    navigator.mediaDevices
      .enumerateDevices()
      .then(this.extractCameras)
      .catch(this.handleCameraError);
  }

  componentWillReceiveProps(nextProps) {
    const {rawPhoneFeedWSURL, selectedCamera, actions} = this.props;
    if (rawPhoneFeedWSURL && nextProps.rawPhoneFeedWSURL) {
      if (rawPhoneFeedWSURL !== nextProps.rawPhoneFeedWSURL) {
        this.runWebSocket(nextProps.rawPhoneFeedWSURL);
      }
    }
    if (nextProps.selectedCamera) {
      if (selectedCamera !== nextProps.selectedCamera) {
        actions.sessions.setCameraConnectionStatus(true);
        this.startCameraStream(nextProps.selectedCamera);
      }
    }
  }

  extractCameras = devices => {
    const {actions} = this.props;
    let videoCaptureDevices = [];

    for (let i = 0; i !== devices.length; ++i) {
      let device = devices[i];
      let option = {
        label: '',
        value: null
      };
      option.value = device.deviceId;
      if (device.kind === 'videoinput') {
        option.label =
          device.label || 'Camera ' + (videoCaptureDevices.length + 1);
        videoCaptureDevices.push(option);
      }
    }
    actions.sessions.setListOfAvailableCameras(videoCaptureDevices);
  };

  startCameraStream = source => {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const constraints = {
      video: {deviceId: source ? {exact: source} : undefined},
      audio: false
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(this.attachStreamToCamera)
      .then(this.extractCameras)
      .catch(this.handleCameraError);
  };

  stopCameraStream = () => {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  };

  attachStreamToCamera = stream => {
    const video = document.querySelector('video');
    window.stream = stream;
    video.srcObject = stream;
    // Refresh camera list
    return navigator.mediaDevices.enumerateDevices();
  };

  handleCameraError = error => {
    const {actions} = this.props;
    actions.sessions.setCameraConnectionStatus(false);
    console.log(
      'navigator.MediaDevices.getUserMedia error: ',
      error.message,
      error.name
    );
  };

  getScreenShot = () => {
    const video = document.querySelector('video');
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  };

  runWebSocket = address => {
    const {actions, location} = this.props;
    const route = qs.parse(location.search);
    let self = this;

    if ('WebSocket' in window) {
      console.log('CSSI_DEBUG: WebSocket is supported by your Browser!');

      ws = new WebSocket('ws://' + address);
      socket = io(WEBSOCKET_ENDPOINT);

      ws.onopen = function () {
        actions.sessions.setRawPhoneFeedWSConnectionStatus(true);
      };
      ws.onmessage = function (evt) {
        let phoneFeedData = 'data:image/png;base64,' + evt.data;
        actions.sessions.setRawPhoneFeedWSData(phoneFeedData);
        socket.emit(
          'test/start',
          {head_frame: self.getScreenShot()},
          {scene_frame: phoneFeedData},
          {session_id: route.session_id}
        );
      };
      ws.onclose = function () {
        actions.sessions.setRawPhoneFeedWSConnectionStatus(false);
      };

      // Web socket connection with flask socket io
      socket.on('connect', function () {
        let notification = {
          level: 1,
          message:
            'Socket connection established with {}'.format(WEBSOCKET_ENDPOINT)
        };
        actions.notifications.addNotification(notification);
      });
      socket.on('event', function (data) {
        console.log('Socket server message: {0}'.format(data));
      });
      socket.on('disconnect', function () {
        console.log('Socket server disconnected');
      });
    } else {
      console.log('CSSI_DEBUG: WebSocket NOT supported by your Browser!');
    }
  };

  stopTestSession = () => {
    const {location, currentSession} = this.props;

    ws.close(); // close screen-share socket connection
    socket.disconnect(); // close CSSI api socket connection

    this.stopCameraStream(); // stop the camera stream

    const route = qs.parse(location.search);
    let searchParams = '?type=post&session_id=' + route.session_id + '&q_id=' + currentSession.questionnaire.id;
    navigate('questionnaire', searchParams);
  };

  render() {
    const {
      isRawPhoneFeedWSConnected,
      rawPhoneFeedWSData,
      availableCameras,
      isCameraConnected
    } = this.props;

    let cameraTypeOptions = null;

    if (availableCameras) {
      cameraTypeOptions = availableCameras.map(cam => ({
        value: cam.value,
        label: cam.label
      }));
    }

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
                {
                  isRawPhoneFeedWSConnected && isCameraConnected ?
                    (
                      <div className="content-description text-center mb-4">
                        <h2>Session Started</h2>
                        <h5 className="text-muted font-weight-light">
                          Press the Stop Session button to terminate the test session.
                        </h5>
                      </div>
                    )
                    :
                    (
                      <div className="content-description text-center mb-4">
                        <h2>Start Session</h2>
                        <h5 className="text-muted font-weight-light">
                          Select and connect the video camera first and then enter the Phone feed URL.
                        </h5>
                      </div>
                    )
                }
              </Col>
            </Row>
            <div className="feed-wrapper">
              <Row>
                <Col lg={8} md={6} sm={12}>
                  <Card
                    title={''}
                    content={
                      <div className="camera-feed-wrapper">
                        <div className="camera-feed-container text-center">
                          {isCameraConnected ? (
                            <video id="video" autoPlay/>
                          ) : (
                            <EmptyPlaceholder
                              title={'Camera Feed'}
                              subTitle={'Camera feed is not connected'}
                              extraContext={
                                'Please select the preferred video source from the select box bellow'
                              }
                              icon={videoCameraIcon}
                            />
                          )}
                          <CameraFeedConnectionForm
                            cameraTypes={cameraTypeOptions}
                          />
                        </div>
                      </div>
                    }
                  />
                </Col>
                <Col lg={4} md={6} sm={12}>
                  <Card
                    title={''}
                    content={
                      <div className="phone-feed-wrapper">
                        <div className="phone-feed-container text-center">
                          {isRawPhoneFeedWSConnected ? (
                            <img src={rawPhoneFeedWSData}/>
                          ) : (
                            <EmptyPlaceholder
                              title={'Mobile Phone Feed'}
                              subTitle={'Phone feed is not connected'}
                              extraContext={
                                'Please enter the URL to obtain websocket connection address. ex: http://192.168.8.103:8123'
                              }
                              icon={phoneIcon}
                            />
                          )}
                        </div>
                        <PhoneFeedConnectionForm/>
                      </div>
                    }
                  />
                </Col>
              </Row>
            </div>
          </div>

          <Row>
                <Col md={12}>
                  <div className="text-center mt-2">
                    <Button
                      type="submit"
                      bsStyle="primary"
                      bsSize="lg"
                      disabled={!(isRawPhoneFeedWSConnected && isCameraConnected)}
                      onClick={this.stopTestSession}
                      fillSecondary
                      fill
                    >
                      Stop Session
                    </Button>
                  </div>
                </Col>
            <canvas id="canvas" width="640" height="480"/>
            <img id="test"/>
          </Row>
        </Grid>
      </div>
    );
  }
}

const injectedPropTypes = {
  actions: PropTypes.shape({})
};

Evaluation.propTypes = {
  ...injectedPropTypes
};

function mapStateToProps(state) {
  return {
    currentSession: state.sessions.currentSession,
    isCameraConnected: state.sessions.isCameraConnected,
    isRawPhoneFeedWSConnected: state.sessions.isRawPhoneFeedWSConnected,
    rawPhoneFeedWSURL: state.sessions.rawPhoneFeedWSURL,
    rawPhoneFeedWSData: state.sessions.rawPhoneFeedWSData,
    availableCameras: state.sessions.availableCameras,
    selectedCamera: state.sessions.selectedCamera,
    viewConfig: state.sessions.sessionViewConfig
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sessions: bindActionCreators(sessionActionCreators, dispatch),
      notifications: bindActionCreators(notificationActionCreators, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Evaluation);
