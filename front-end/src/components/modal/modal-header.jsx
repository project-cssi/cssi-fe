import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';

const ModalHeader = (props) => {
  const { children, title } = props;
  return (
    <ReactBootstrapModal.Header closeButton>
      <ReactBootstrapModal.Title>
        { title }
      </ReactBootstrapModal.Title>
      { children }
    </ReactBootstrapModal.Header>
  );
};

ModalHeader.defaultProps = {
  children: null,
  title: null,
};

ModalHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default ModalHeader;
