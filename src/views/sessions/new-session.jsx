import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dropdownActionCreators from '../../redux/actions/from-dropdown-actions';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Card from '../../components/card/card';

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

const columns = [
  {
    title: 'Invoice #',
    data: 'number',
    className: 'row-status',
    width: '13%',
  },
  {
    title: 'Date',
    data: 'datetime',
    width: '16%',
    render(data) {
      return moment(data).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: 'Customer',
    data: 'client.name',
  },
  {
    title: 'Vehicle',
    data: 'vehicle.registration',
  },
  {
    title: 'Creator',
    data: 'creator',
  },
  {
    title: 'Status',
    data: 'status',
    render(data, type, row) {
      if (data === 'Complete' && row.settled === true) {
        return '<span><i class="fa fa fa-circle" style="color: #81d44a"></i>&ensp;Settled</span>';
      }
      if (data === 'Complete' && row.settled === false) {
        return '<span><i class="fa fa fa-circle" style="color: #ffbc67"></i>&ensp;Pending</span>';
      }
      return `<span><i class="fa fa fa-circle" style="color: #9f9f9f"></i>&ensp;${data || 'N/A'}</span>`;
    },
  },
  {
    title: 'Total',
    data: 'pricing.nett',
    render(data) {
      return parseFloat(data).format();
    },
  },
];

class NewSession extends Component {

  render() {
    return (
      <div className="main-content no-padding">
        <Grid fluid>
          <Row>
            <div className="sub-header">

            </div>
          </Row>
          <Row>
            <div className="content-header transparent">
              <Col md={12}>
                <h1>Add Application Metadata</h1>
              </Col>
            </div>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                customCssClass="margin-top"
                content={
                  <div></div>
                }
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
