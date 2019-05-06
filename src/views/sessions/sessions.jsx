import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  Table
} from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as qs from 'query-string';
import {CustomButton as Button} from '../../elements';
import * as modalActionCreators from '../../redux/actions/modal-actions';
import * as sessionActionCreators from '../../redux/actions/session-actions';
import {navigate} from '../../services';
import cssiLogo from '../../assets/img/logos/cssi-logo.svg';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components';
import uuidv4 from 'uuid/v4';

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

const columns = [
  {
    title: 'Session ID',
    data: 'id',
    className: 'row-status',
    width: '10%',
  },
  {
    title: 'Date',
    data: 'creation_date',
    width: '20%',
    render(data) {
      return moment(data).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: 'App',
    data: 'app.name',
  },
  {
    title: 'Developer',
    data: 'app.developer',
  },
  {
    title: 'Questionnaire',
    data: 'questionnaire.id',
  },
  {
    title: 'Final Score',
    data: 'cssi_score',
  },
  {
    title: 'Status',
    data: 'status',
    render(data) {
      if (data === 'completed') {
        return '<span><i class="fa fa fa-circle" style="color: #81d44a"></i>&ensp;Completed</span>';
      }
      if (data === 'started') {
        return '<span><i class="fa fa fa-circle" style="color: #ffbc67"></i>&ensp;Started</span>';
      }
      return `<span><i class="fa fa fa-circle" style="color: #9f9f9f"></i>&ensp;${data || 'Initialized'}</span>`;
    },
  },
];

class Sessions extends Component {
  componentDidMount() {
    const {actions, sessions} = this.props;

    actions.sessions.fetchSessions();

    // Generate the Table
    $(this.refs.sessionsTable).DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
      data: sessions,
      columns,
      responsive: true,
      order: [[0, 'dec']],
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search Sessions',
      },
    });

    const table = $(this.refs.sessionsTable).DataTable();

    const self = this;

    table.on('click', 'tbody td', function () {
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      if (data) {
        self.handleSessionView(data);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {sessions, location} = this.props;
    if (sessions && nextProps.sessions) {
      if (!_.isEqual(sessions, nextProps.sessions)) {
        const table = $(this.refs.sessionsTable).DataTable();
        table.clear();
        table.rows.add(nextProps.sessions);
        table.draw(false);

        // Reads the URL id param and opens the corresponding invoice
        const route = qs.parse(location.search);
        if (route.session_id) {
          const newlyCreatedSession = _.find(nextProps.sessions, session => session.id === parseInt(route.session_id));
          this.handleSessionView(newlyCreatedSession);
        }
      }
    }
  }

  componentWillUnmount() {
    $('.data-table-wrapper')
      .find('table')
      .DataTable()
      .destroy(true);
  }

  handleSessionView = (session) => {
    const {actions} = this.props;
    const modalKey = 'session-results-modal';
    if (session.status === 'completed') {
      actions.sessions.setSelectedSession(session);
      actions.modal.openModal({modalKey});
    }
  };

  handleSessionCreate = () => {
    navigate('newSession');
  };

  render() {
    const {
      actions, modal, selectedSession
    } = this.props;

    return (
      <div className="main-content no-padding no-overflow">
        <Grid fluid>
          <Row>
            <div className="sub-header">
              <Col md={12}>
                <div className="operations-btn-group">
                  <Button bsStyle="default" bsSize="sm" fill onClick={this.handleSessionCreate}>
                    New Session
                  </Button>
                </div>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="content-wrapper fixed-height">
              <Col md={12}>
                <div className="cssi-datatables-container">
                  <div className="fresh-datatables cssi-datatables">
                    <table
                      id="sessionsTable"
                      ref="sessionsTable"
                      className="table table-no-bordered table-hover"
                      cellSpacing="0"
                      width="100%"
                      style={{width: '100%'}}
                    />
                    {selectedSession && selectedSession.app ?
                      <Modal
                        modalKey="session-results-modal"
                        closeAction={actions.modal.closeModal}
                        modalState={modal.Modal}
                        className="modal-50w"
                      >
                        <ModalHeader title=" "/>
                        <ModalBody>
                          <div className="session-report">
                            <div className="report-header">
                              <Row>
                                <Col xs={9}>
                                  <div className="info">
                                    <img className="logo" src={cssiLogo}/>
                                  </div>
                                </Col>
                                <Col xs={3}>
                                  <div className="session-info">
                                    <div className="title">
                                      Session
                                    </div>
                                    <div className="id">
                                      #
                                      {selectedSession.id}
                                    </div>
                                    <div className="date">
                                      {moment(selectedSession.creation_date).format('YYYY-MM-DD HH:mm')}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div className="session-body">
                              <Row>
                                <div className="meta">
                                  <Col xs={4}>
                                    <h6>
                                      Application
                                    </h6>
                                    <div className="app-details">
                                      <div className="key">
                                        Name
                                      </div>
                                      <div className="value">
                                        {selectedSession.app.name}
                                      </div>
                                      <div className="key">
                                        Developer
                                      </div>
                                      <div className="value">
                                        {selectedSession.app.developer}
                                      </div>
                                      <div className="key">
                                        Genre
                                      </div>
                                      <div className="value">
                                        {selectedSession.app.genre.display_name}
                                      </div>
                                      <div className="key">
                                        Type
                                      </div>
                                      <div className="value">
                                        {selectedSession.app.type.display_name_full}
                                      </div>
                                    </div>
                                  </Col>
                                </div>
                              </Row>
                              <br className="clearfix"/>
                              <br className="clearfix"/>
                              <Row>
                                <Col xs={12}>
                                  <div className="session-table">
                                    <div className="table-head">
                                      <div className="details">
                                        Contributor
                                      </div>
                                      <div className="score text-right">
                                        Score
                                      </div>
                                    </div>
                                    <div className="table-body">
                                      {/** Latency **/}
                                      <div className="table-item">
                                        <div className="table-row" key={uuidv4()}>
                                          <div className="table-data details">
                                            <div className="name">
                                              Latency
                                            </div>
                                          </div>
                                          <div className="table-data score text-right">
                                            {parseFloat(selectedSession.total_latency_score).format()}
                                          </div>
                                        </div>
                                      </div>
                                      {/** Sentiment **/}
                                      <div className="table-item">
                                        <div className="table-row" key={uuidv4()}>
                                          <div className="table-data details">
                                            <div className="name">
                                              Sentiment
                                            </div>
                                            <div className="description">
                                              Expected Emotions : &ensp;
                                              {selectedSession.expected_emotions.map(emotion => (
                                                  <span className="text-uppercase">{emotion} &ensp;</span>
                                                )
                                              )}
                                            </div>
                                          </div>
                                          <div className="table-data score text-right">
                                            {parseFloat(selectedSession.total_sentiment_score).format()}
                                          </div>
                                        </div>
                                      </div>
                                      {/** Questionnaire **/}
                                      <div className="table-item">
                                        <div className="table-row" key={uuidv4()}>
                                          <div className="table-data details">
                                            <div className="name">
                                              Questionnaire
                                            </div>
                                          </div>
                                          <div className="table-data score text-right">
                                            {parseFloat(selectedSession.total_questionnaire_score).format()}
                                          </div>
                                        </div>
                                        <div className="parts-table">
                                          <div className="table-body">
                                            {/** Pre Questionnaire **/}
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details heading">
                                                Pre-Questionnaire
                                              </div>
                                              <div className="table-data score text-right">
                                                {' '}
                                              </div>
                                            </div>
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details">
                                                Nausea Score
                                              </div>
                                              <div className="table-data score text-right">
                                                {parseFloat(selectedSession.questionnaire_scores.pre.N).format()}
                                              </div>
                                            </div>
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details">
                                                Disorientation Score
                                              </div>
                                              <div className="table-data score text-right">
                                                {parseFloat(selectedSession.questionnaire_scores.pre.D).format()}
                                              </div>
                                            </div>
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details">
                                                Oculomotor Score
                                              </div>
                                              <div className="table-data score text-right">
                                                {parseFloat(selectedSession.questionnaire_scores.pre.O).format()}
                                              </div>
                                            </div>
                                            {/** Post Questionnaire **/}
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details heading">
                                                Post-Questionnaire
                                              </div>
                                              <div className="table-data score text-right">
                                                {' '}
                                              </div>
                                            </div>
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details">
                                                Nausea Score
                                              </div>
                                              <div className="table-data score text-right">
                                                {parseFloat(selectedSession.questionnaire_scores.post.N).format()}
                                              </div>
                                            </div>
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details">
                                                Disorientation Score
                                              </div>
                                              <div className="table-data score text-right">
                                                {parseFloat(selectedSession.questionnaire_scores.post.D).format()}
                                              </div>
                                            </div>
                                            <div className="table-row" key={uuidv4()}>
                                              <div className="table-data details">
                                                Oculomotor Score
                                              </div>
                                              <div className="table-data score text-right">
                                                {parseFloat(selectedSession.questionnaire_scores.post.O).format()}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <br className="clearfix"/>
                              <Row>
                                <Col xs={7} xsOffset={5}>
                                  <div className="session-score-table">
                                    <Table>
                                      <tbody>
                                      <tr className="grand-total">
                                        <th>
                                          Final CSSI Score
                                        </th>
                                        <td>
                                          {parseFloat(selectedSession.cssi_score).format()}
                                        </td>
                                      </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </ModalBody>
                        <ModalFooter/>
                      </Modal>
                      :
                      null
                    }
                  </div>
                </div>
              </Col>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}

const injectedPropTypes = {
  actions: PropTypes.shape({}),
  modal: PropTypes.shape({
    Modal: PropTypes.shape({
      showModal: PropTypes.bool,
      modalKey: PropTypes.string,
    }),
  }),
};

Sessions.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    modal: state.modal,
    selectedSession: state.sessions.selectedSession,
    sessions: state.sessions.sessions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      modal: bindActionCreators(modalActionCreators, dispatch),
      sessions: bindActionCreators(sessionActionCreators, dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
