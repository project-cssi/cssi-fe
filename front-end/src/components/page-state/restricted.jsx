import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { navigate } from '../../services';
import RestrictedIllustration from '../../assets/img/restricted-illustration.png';

const Restricted = () => (
  <div className="main-content restricted-page">
    <Grid fluid>
      <Row>
        <div className="restricted-content">
          <div className="illustration">
            <img src={RestrictedIllustration} alt="restricted" />
          </div>

          <div className="error-text">
            <p className="title">
              Restricted Area
            </p>
            <p className="description">
              This area is restricted for some users. If this is an unusual issue,
              Please contact the administrator. Click
              <a onClick={() => navigate('dashboard')} className="link">
                here
              </a>
               to navigate to the Dashboard.
            </p>
          </div>

        </div>
      </Row>
    </Grid>
  </div>
);

export default Restricted;
