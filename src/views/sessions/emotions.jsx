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
import * as applicationActionCreators from '../../redux/actions/application-actions';
import * as sessionActionCreators from '../../redux/actions/session-actions';
import {CustomButton as Button} from '../../elements';
import happinessIcon from '../../assets/img/emotions/happiness.svg';
import sadnessIcon from '../../assets/img/emotions/sadness.svg';
import neutralIcon from '../../assets/img/emotions/neutral.svg';
import disgustIcon from '../../assets/img/emotions/disgust.svg';
import surpriseIcon from '../../assets/img/emotions/surprise.svg';
import fearIcon from '../../assets/img/emotions/fear.svg';
import angerIcon from '../../assets/img/emotions/anger.svg';

class Emotions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emotions: [
        {
          displayName: 'Happiness',
          name: 'happiness',
          icon: happinessIcon,
          selected: false
        },
        {
          displayName: 'Neutral',
          name: 'neutral',
          icon: neutralIcon,
          selected: false
        },
        {
          displayName: 'Sadness',
          name: 'sadness',
          icon: sadnessIcon,
          selected: false
        },
        {
          displayName: 'Anger',
          name: 'anger',
          icon: angerIcon,
          selected: false
        },
        {
          displayName: 'Disgust',
          name: 'disgust',
          icon: disgustIcon,
          selected: false
        },
        {
          displayName: 'Fear',
          name: 'fear',
          icon: fearIcon,
          selected: false
        },
        {
          displayName: 'Surprise',
          name: 'surprise',
          icon: surpriseIcon,
          selected: false
        }
      ],
      selectedEmotions: []
    };
  }

  handleEmotionSelect = (emotion) => {
    const {emotions, selectedEmotions} = this.state;
    // clone object to avoid mutating
    const _emotion = _.cloneDeep(emotion);
    _emotion.selected = !_emotion.selected;

    // clone array to avoid mutations
    const _emotions = _.cloneDeep(emotions);

    // Find index and replace item
    const index = _.findIndex(_emotions, emotion);
    _emotions.splice(index, 1, _emotion);

    this.setState({emotions: _emotions});

    const _selectedEmotions = _.cloneDeep(selectedEmotions);

    if (_emotion.selected) {
      _selectedEmotions.push(_emotion.name);
    } else {
      const index_selected = _.findIndex(_selectedEmotions, _emotion.name);
      _selectedEmotions.splice(index_selected, 1, _emotion.name);
    }

    this.setState({selectedEmotions: _selectedEmotions});
  };

  handleEmotionSubmit = () => {
    const { actions } = this.props;
    const { selectedEmotions } = this.state;
    actions.sessions.setExpectedEmotions(selectedEmotions);
  };

  render() {
    const {
      emotions, selectedEmotions
    } = this.state;

    return (
      <div className="main-content no-padding session-page">
        <Grid fluid>
          <Row>
            <div className="sub-header">
              <h5 className="text-white ml-3">Application</h5>
            </div>
          </Row>
          <div className="main-session-content with-top-padding">
            <Row>
              <Col md={6} mdOffset={3}>
                <div className="content-description text-center mb-4">
                  <h2>Expected Emotions</h2>
                  <h5 className="text-muted font-weight-light">
                    Expected emotions may vary from application to application. In order for the system to provide an
                    accurate Cybersickness score, Please select the expected emotions from bellow.
                  </h5>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="grid-card-flex-container">
                {
                  emotions.map(emotion => (
                    <div className={'grid-card sm mr-2 ml-2 ' + (emotion.selected ? 'selected' : '')}
                         onClick={() => this.handleEmotionSelect(emotion)}>
                      <div className="grid-card-thumbnail-container">
                        <div className="grid-card-thumbnail bg-white mb-1 pt-3 pr-3 pl-3 pb-1">
                          <img src={emotion.icon} width={80} height={80}/>
                        </div>
                      </div>
                      <div className="grid-card-content-container text-center mb-1">
                        <div className="grid-card-heading">{emotion.displayName}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </Row>
          </div>
          <Row>
            <Col md={12}>
              <div className="text-center mt-2">
                <Button type="submit" bsStyle="primary" disabled={selectedEmotions.length < 1} bsSize="sm" wd fill onClick={this.handleEmotionSubmit}>
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

Emotions.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    selectedApplication: state.applications.selectedApplication,
    viewConfig: state.sessions.sessionViewConfig,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sessions: bindActionCreators(sessionActionCreators, dispatch),
      applications: bindActionCreators(applicationActionCreators, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Emotions);
