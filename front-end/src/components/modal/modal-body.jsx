import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

const ModalBody = (props) => {
  const { children } = props;
  return (
    <ReactBootstrapModal.Body>
      {children}
    </ReactBootstrapModal.Body>
  );
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
