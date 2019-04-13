import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Jumbotron,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { CustomButton as Button } from '../../elements';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retracted: false,
    };
  }

  render() {
    const {
      loggedInUser,
    } = this.props;

    const {
      retracted,
    } = this.state;

    return (
      <div className="main-content no-padding">
        <Jumbotron bsClass={retracted ? 'jumbotron retracted' : 'jumbotron'}>
          <Row>
            <div className="welcome-message-lg">
              <Col md={12}>
                <h3>
                  {
                    (loggedInUser && loggedInUser.firstName && loggedInUser.lastName)
                      ? (
                        <span>
                          Hello,
                          {loggedInUser.firstName}
                          {loggedInUser.lastName}
                          !
                          {' '}
                        </span>
                      )
                      : (
                        <span>
                          Hello!
                          {' '}
                        </span>
                      )
                  }
                  Welcome to CSSI
                </h3>
                <p>
                  The Cybersickness susceptibility testing platform for Virtual Reality
                </p>
              </Col>
              <Col md={12}>
                <div className="pull-right">
                  <Button bsStyle="default" fill onClick={() => this.setState({ retracted: true })}>
                    Show Less
                    {' '}
                    <i className="fa fa-angle-double-up" />
                  </Button>
                </div>
              </Col>
            </div>
            <div className="welcome-message-sm">
              <Col md={12}>
                <div className="pull-left">
                  <h3>
                    {
                      (loggedInUser && loggedInUser.firstName && loggedInUser.lastName)
                        ? (
                          <span>
                            Hello,
                            {loggedInUser.firstName}
                            {loggedInUser.lastName}
                            !
                            {' '}
                          </span>
                        )
                        : (
                          <span>
                            Hello!
                            {' '}
                          </span>
                        )
                    }
                  </h3>
                </div>
                <div className="pull-right">
                  <Button bsStyle="default" fill onClick={() => this.setState({ retracted: false })}>
                    Show More
                    {' '}
                    <i className="fa fa-angle-double-down" />
                  </Button>
                </div>
              </Col>
            </div>
          </Row>
        </Jumbotron>
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
  loggedInUser: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string,
  }),
};

Dashboard.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    dropdown: state.dropdown,
    loggedInUser: state.users.loggedInUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
