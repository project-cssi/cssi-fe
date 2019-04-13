import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

class ModalFooter extends Component {
  onCancel=() => {
    const { handleClose } = this.context;
    handleClose();
  };

  getContent=() => {
    const { children } = this.props;
    return (
      <div>
        <div className="custom-modal-footer-actions">
          {children}
        </div>
      </div>
    );
  };

  render() {
    const content = this.getContent();
    return (
      <ReactBootstrapModal.Footer>
        { content }
      </ReactBootstrapModal.Footer>
    );
  }
}

ModalFooter.defaultProps = {
  children: null,
};

ModalFooter.propTypes = {
  children: PropTypes.node,
};

ModalFooter.contextTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ModalFooter;
