import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  getChildContext() {
    const { modalKey } = this.props;
    return {
      modalKey,
      handleClose: this.handleClose,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { modalKey, modalState } = nextProps;
    if (modalKey === modalState.modalKey) {
      return { show: modalState.showModal };
    }
    return { show: false };
  }

  handleClose = () => {
    const { closeAction, modalKey } = this.props;
    closeAction({ modalKey });
  };

  render() {
    const { show } = this.state;
    const { className, children } = this.props;
    return (
      <ReactBootstrapModal
        onHide={this.handleClose}
        show={show}
        dialogClassName={className}
      >
        { children }
      </ReactBootstrapModal>
    );
  }
}

Modal.defaultProps = {
  className: null,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeAction: PropTypes.func.isRequired,
  modalKey: PropTypes.string.isRequired,
  className: PropTypes.string,
  modalState: PropTypes.shape({
    showModal: PropTypes.bool,
    modalKey: PropTypes.string,
  }).isRequired,
};

Modal.childContextTypes = {
  handleClose: PropTypes.func,
  modalKey: PropTypes.string,
};

export default Modal;
