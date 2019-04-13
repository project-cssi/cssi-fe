import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomButton as Button } from '../../elements';

class FormDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  getChildContext = () => {
    const { dropdownKey } = this.props;
    return {
      dropdownKey,
      handleClose: this.handleClose,
    };
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    const { dropdownKey, dropdownState } = nextProps;
    if (dropdownKey === dropdownState.dropdownKey) {
      this.setState({ show: dropdownState.showDropdown });
    } else {
      this.setState({ show: false });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClose = () => {
    const { closeAction, dropdownKey } = this.props;
    closeAction({ dropdownKey });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleClose();
    }
  }

  render() {
    const { show } = this.state;
    const { className, children } = this.props;
    return (
      <div>
        {
          (show)
            ? (
              <div className={`form-dropdown ${className}`} ref={this.setWrapperRef}>
                <div className="form-header">
                  <Button bsSize="xs" simple onClick={this.handleClose}>
                    <i className="fa fa-close" />
                  </Button>
                </div>
                <div className="form-content">
                  {children}
                </div>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

FormDropdown.propTypes = {
  children: PropTypes.node.isRequired,
  closeAction: PropTypes.func.isRequired,
  dropdownKey: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dropdownState: PropTypes.shape({
    showDropdown: PropTypes.bool,
    dropdownKey: PropTypes.string,
  }).isRequired,
};

FormDropdown.childContextTypes = {
  handleClose: PropTypes.func,
  dropdownKey: PropTypes.string,
};

export default FormDropdown;
