import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import $ from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import SweetAlert from 'react-bootstrap-sweetalert';
import * as modalActionCreators from '../../redux/actions/modal-actions';
import * as applicationActionCreators from '../../redux/actions/application-actions';
import {CustomButton as Button} from '../../elements';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components';
import {CreateApplicationForm} from '../../forms';

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

const columns = [
  {
    title: 'Name',
    data: 'name',
  },
  {
    title: 'Developer',
    data: 'developer',
  },
  {
    title: 'Type',
    data: 'type.display_name_full',
  },
  {
    title: 'Genre',
    data: 'genre.display_name',
  },
  {
    title: 'Sharing',
    data: 'public_sharing',
    render(data, type, row) {
      if (data === true) {
        return `<div class="toggle-switch-container">
                  <div class="toggle-switch">
                    <input type="checkbox" id=${row.id} name="toggle-switch-reader"
                    class="toggle-switch-reader" checked/>
                    <label for=${row.id} class="toggle-switch-track"></label>
                  </div>
                  <span class="toggle-switch-label">${data}</span>
                </div>`;
      }
      if (data === false) {
        return `<div class="toggle-switch-container">
                  <div class="toggle-switch">
                    <input type="checkbox" id=${row.id} name="toggle-switch-reader" class="toggle-switch-reader"/>
                    <label for=${row.id} class="toggle-switch-track"></label>
                  </div>
                  <span class="toggle-switch-label">${data}</span>
                </div>`;
      }
      return `<div class="toggle-switch-container">
                  <div class="toggle-switch">
                    <input type="checkbox" id=${row.id} name="toggle-switch-reader" class="toggle-switch-reader"/>
                    <label for=${row.id} class="toggle-switch-track"></label>
                  </div>
                  <span class="toggle-switch-label">N/A</span>
                </div>`;
    },
  },
  {
    title: 'Actions',
    className: 'disabled-sorting text-right',
    defaultContent: '<a class="btn btn-simple btn-default btn-icon edit-application"><i class="fa fa-pencil"></i></a>'
    + '<a class="btn btn-simple btn-danger btn-icon remove-application"><i class="fa fa-trash-o"></i></a>',
  },
];

const createApplicationModalKey = 'create-application-modal';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
    };
  }

  componentDidMount() {
    const {actions, applications} = this.props;

    actions.applications.fetchApplications();
    actions.applications.fetchApplicationTypes();
    actions.applications.fetchApplicationGenres();

    // Generate the Table
    $(this.refs.applicationsTable).DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
      data: applications,
      columns,
      order: [[2, 'asc']],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search Applications',
      },
    });

    const table = $(this.refs.applicationsTable).DataTable();
    const self = this;
    // Edit
    table.on('click', '.edit-application', function () {
      const modalKey = createApplicationModalKey;
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      const application = {
        name: data.name,
        developer: data.developer,
        type: {value: data.type, label: data.type},
        description: data.description,
        genre: {value: data.genre, label: data.genre},
      };
      const config = {
        title: 'Edit Application',
        button: 'Save Changes',
        mode: 'edit',
      };
      self.props.actions.applications.setApplicationViewConfig(config);
      self.props.actions.applications.setEditingApplication(application);
      self.props.actions.modal.openModal({modalKey});
    });

    // Update activation status
    table.on('click', '.toggle-switch', function (e) {
      e.preventDefault();
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      const application = {
        name: data.name,
        developer: data.developer,
        type: {value: data.type, label: data.type},
        description: data.description,
        genre: {value: data.genre, label: data.genre},
      };
      self.props.actions.applications.setEditingApplication(application);
      self.props.actions.applications.updateApplicationSharingStatus(data);
    });

    // Delete
    table.on('click', '.remove-application', function () {
      const $tr = $(this).closest('tr');
      const application = table.row($tr).data();
      self.props.actions.applications.setDeletingApplication(application);
      self.showApplicationDeleteAlert();
    });
  }

  componentWillReceiveProps(nextProps) {
    const {applications} = this.props;
    if (applications && nextProps.applications) {
      if (!_.isEqual(applications, nextProps.applications)) {
        const table = $(this.refs.applicationsTable).DataTable();
        table.clear();
        table.rows.add(nextProps.applications);
        table.draw(false);
      }
    }
  }

  componentWillUnmount() {
    $('.data-table-wrapper')
      .find('table')
      .DataTable()
      .destroy(true);
  }

  openModal = (e) => {
    const {actions} = this.props;
    const {modalKey} = e.target.dataset;
    actions.modal.openModal({modalKey});
  };

  handleApplicationCreate = (e) => {
    const {actions} = this.props;
    const config = {
      title: 'Create New Application',
      button: 'Create Application',
      mode: 'create',
    };
    actions.applications.setApplicationViewConfig(config);
    actions.applications.setEditingApplication({});
    this.openModal(e);
  };

  handleApplicationDelete = () => {
    const {actions, deletingApplication} = this.props;
    actions.applications.deleteApplication(deletingApplication.id);
    this.hideAlert();
  };

  showApplicationDeleteAlert = () => {
    this.setState({
      alert: (
        <SweetAlert
          warning
          showCancel
          style={{display: 'block', borderRadius: '0'}}
          confirmBtnText="Confirm"
          confirmBtnBsStyle="danger"
          confirmBtnCssClass="btn-fill btn-wd"
          cancelBtnBsStyle="default"
          cancelBtnCssClass="btn-fill btn-wd"
          btnSize="sm"
          title="Are you sure?"
          onConfirm={this.handleApplicationDelete}
          onCancel={this.hideAlert}
          customClass="cssi-sweet-alert"
        >
          <div className="alert-content-text">
            If you press confirm, the application will be permanently deleted and could not be recovered.
            {' '}
            Please press confirm to proceed.
          </div>
        </SweetAlert>
      ),
    });
  };

  hideAlert = () => {
    this.setState({alert: null});
  };

  render() {
    const {
      actions, modal, viewConfig, editingApplication, applicationTypes, applicationGenres
    } = this.props;

    const {
      alert,
    } = this.state;

    let applicationTypesOptions = null;

    if (applicationTypes) {
      applicationTypesOptions = applicationTypes
        .map(type => (
          { value: type, label: type.display_name_full }
        ));
    }

    let applicationGenreOptions = null;

    if (applicationGenres) {
      applicationGenreOptions = applicationGenres
        .map(genre => (
          { value: genre, label: genre.display_name }
        ));
    }

    return (
      <div className="main-content no-padding no-overflow">
        <Grid fluid>
          <Row>
            <div className="sub-header">
              <Col md={12}>
                <div className="operations-btn-group">
                  <Button bsStyle="default" bsSize="sm" fill data-modal-key="create-application-modal" onClick={this.handleApplicationCreate}>
                    New Application
                  </Button>
                </div>
                <Modal
                  modalKey="create-application-modal"
                  closeAction={actions.modal.closeModal}
                  modalState={modal.Modal}
                >
                  <ModalHeader title={viewConfig ? viewConfig.title : 'Create Application'}/>
                  <ModalBody>
                    <CreateApplicationForm
                      initialValues={(editingApplication && !_.isEmpty(editingApplication)) ? editingApplication : {}}
                      config={viewConfig}
                      applicationTypes={applicationTypesOptions}
                      genreTypes={applicationGenreOptions}
                    />
                  </ModalBody>
                  <ModalFooter/>
                </Modal>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="content-wrapper fixed-height">
              <Col md={12}>
                <div className="cssi-datatables-container">
                  <div className="fresh-datatables cssi-datatables">
                    <table
                      id="applicationsTable"
                      ref="applicationsTable"
                      className="table table-no-bordered table-hover"
                      cellSpacing="0"
                      width="100%"
                      style={{width: '100%'}}
                    />
                    {alert}
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
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      developer: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      genre: PropTypes.string,
      public_sharing: PropTypes.bool,
    }),
  ),
  editingApplication: PropTypes.shape({
    name: PropTypes.string,
    developer: PropTypes.string,
    type: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
    description: PropTypes.string,
    genre: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
    public_sharing: PropTypes.bool,
  }),
  deletingApplication: PropTypes.shape({
    name: PropTypes.string,
    developer: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    public_sharing: PropTypes.bool,
  }),
  viewConfig: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
    mode: PropTypes.string,
  }),
};

Applications.propTypes = {
  ...injectedPropTypes,
};

function mapStateToProps(state) {
  return {
    modal: state.modal,
    applications: state.applications.applications,
    applicationTypes: state.applications.applicationTypes,
    applicationGenres: state.applications.applicationGenres,
    newApplication: state.applications.newApplication,
    editingApplication: state.applications.editedApplication,
    deletingApplication: state.applications.deletingApplication,
    viewConfig: state.applications.applicationViewConfig,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      modal: bindActionCreators(modalActionCreators, dispatch),
      applications: bindActionCreators(applicationActionCreators, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
