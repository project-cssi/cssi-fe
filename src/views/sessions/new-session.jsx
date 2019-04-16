import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dropdownActionCreators from '../../redux/actions/from-dropdown-actions';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import createAppIcon from '../../assets/img/illustrations/create-app.svg'
import selectAppIcon from '../../assets/img/illustrations/select-app.svg'

class NewSession extends Component {

  render() {
    return (
      <div className="main-content no-padding new-session-page">
        <Grid fluid>
          <Row>
            <div className="sub-header">

            </div>
          </Row>
          <Row>
            <div className="new-session-content">
              <div className="content-description text-center mb-4">
                <h2>Create a New Testing Session</h2>
                <h5 className="text-muted font-weight-light">Please select one of the options from bellow and proceed with the session</h5>
              </div>
              <div className="grid-card-flex-container">
                <div className="grid-card md mr-4 ml-4">
                  <div className="grid-card-thumbnail-container">
                    <div className="grid-card-thumbnail bg-white mb-1 pt-1 pr-2 pl-2 pb-1">
                      <img src={createAppIcon}/>
                    </div>
                  </div>
                  <div className="grid-card-content-container text-center">
                    <div className="grid-card-heading">Create Application</div>
                    <div className="grid-card-description">
                      <div className="main">Create a new application with custom metadata.</div>
                    </div>
                  </div>
                </div>
                <div className="grid-card md mr-4 ml-4">
                  <div className="grid-card-thumbnail-container">
                    <div className="grid-card-thumbnail bg-white mb-1 pt-1 pr-2 pl-2 pb-1">
                      <img src={selectAppIcon}/>
                    </div>
                  </div>
                  <div className="grid-card-content-container text-center">
                    <div className="grid-card-heading">Select Existing</div>
                    <div className="grid-card-description">
                      <div className="main">Select an application which is already being created.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}
const injectedPropTypes = {
  actions: PropTypes.shape({}),
  dropdown: PropTypes.shape({
    Dropdown: PropTypes.shape({
      showDropdown: PropTypes.bool,
      dropdownKey: PropTypes.string,
    }),
  }),
};

NewSession.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    dropdown: state.dropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      dropdown: bindActionCreators(dropdownActionCreators, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSession);
