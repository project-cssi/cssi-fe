import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from '../../components';
import { LoginForm } from '../../forms';
import logo from '../../assets/img/logos/cssi-logo-dashboard.svg';
import { navigate, validateCookie } from '../../services';

class Login extends Component {
  constructor(props) {
    super(props);
    if (validateCookie()) {
      navigate('home');
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col
            lg={4}
            lgOffset={4}
            md={6}
            mdOffset={3}
            sm={6}
            smOffset={3}
            xs={10}
            xsOffset={1}
          >
            <Card
              textCenter
              content={
                <div>
                  <div className="logo">
                    <img src={logo} alt="cssi-logo" />
                  </div>
                  <LoginForm />
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
