import React, {Component} from 'react';
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
import {CameraFeedConnectionForm} from '../../forms/sessions';
import {EmptyPlaceholder} from '../../components';
import videCameraIcon from '../../assets/img/icons/video-camera.svg';
import phoneIcon from '../../assets/img/icons/smartphone.svg';

class Evaluation extends Component {

  componentDidMount() {
    const {actions} = this.props;
    actions.sessions.setCameraConnectionStatus(false);
    actions.sessions.setRawPhoneFeedWSConnectionStatus(false);
    navigator.mediaDevices.enumerateDevices().then(this.extractCameras).catch(this.handleCameraError);
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

  runWebSocket = (address) => {
    const {actions} = this.props;
    let ws;

    if ('WebSocket' in window) {
      console.log('CSSI_DEBUG: WebSocket is supported by your Browser!');

      ws = new WebSocket('ws://' + address);

      ws.onopen = function () {
        actions.sessions.setRawPhoneFeedWSConnectionStatus(true);
      };
      ws.onmessage = function (evt) {
        actions.sessions.setRawPhoneFeedWSData(evt.data);
      };
      ws.onclose = function () {
        actions.sessions.setRawPhoneFeedWSConnectionStatus(false);
      };
    }
    else {
      console.log('CSSI_DEBUG: WebSocket NOT supported by your Browser!');
    }
  };

  extractCameras = (devices) => {
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
        option.label = device.label || 'Camera ' +
          (videoCaptureDevices.length + 1);
        videoCaptureDevices.push(option);
      }
    }
    actions.sessions.setListOfAvailableCameras(videoCaptureDevices);
  };

  startCameraStream = (source) => {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const constraints = {
      video: {deviceId: source ? {exact: source} : undefined}
    };
    navigator.mediaDevices.getUserMedia(constraints).then(this.attachStreamToCamera).then(this.extractCameras).catch(this.handleCameraError);
  };

  attachStreamToCamera = (stream) => {
    const {actions} = this.props;

    const videoElement = document.querySelector('video');
    window.stream = stream;
    videoElement.srcObject = stream;
    // Refresh button list
    return navigator.mediaDevices.enumerateDevices();
  };

  handleCameraError = (error) => {
    const {actions} = this.props;
    actions.sessions.setCameraConnectionStatus(false);
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  };

  render() {
    const {isRawPhoneFeedWSConnected, rawPhoneFeedWSData, availableCameras, isCameraConnected} = this.props;

    console.log(isRawPhoneFeedWSConnected)

    let cameraTypeOptions = null;

    if (availableCameras) {
      cameraTypeOptions = availableCameras
        .map(cam => (
          {value: cam.value, label: cam.label}
        ));
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
                          {
                            isRawPhoneFeedWSConnected ?
                              <img src={'data:image/jpg;base64,' + rawPhoneFeedWSData}/>
                              :
                              <EmptyPlaceholder title={'Mobile Phone Feed'} subTitle={'Phone feed is not connected'}
                                                extraContext={'Please enter the URL to obtain websocket connection address. ex: http://192.168.8.103:8123'}
                                                icon={phoneIcon}/>
                          }
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
                      <div className="camera-feed-wrapper">
                        <div className="camera-feed-container text-center">
                          {
                            isCameraConnected ?
                              <video id="video" playsinline autoPlay></video>
                              :
                              <EmptyPlaceholder title={'Camera Feed'} subTitle={'Camera feed is not connected'}
                                                extraContext={'Please select the preferred video source from the select box bellow'}
                                                icon={videCameraIcon}/>
                          }
                          <CameraFeedConnectionForm cameraTypes={cameraTypeOptions}/>
                        </div>
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
                <Button type="submit" bsStyle="primary" bsSize="lg" disabled={!(isRawPhoneFeedWSConnected && isCameraConnected) } fillSecondary fill>
                  Start Session
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
    isCameraConnected: state.sessions.isCameraConnected,
    isRawPhoneFeedWSConnected: state.sessions.isRawPhoneFeedWSConnected,
    rawPhoneFeedWSURL: state.sessions.rawPhoneFeedWSURL,
    rawPhoneFeedWSData: state.sessions.rawPhoneFeedWSData,
    availableCameras: state.sessions.availableCameras,
    selectedCamera: state.sessions.selectedCamera,
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
