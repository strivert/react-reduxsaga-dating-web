
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import cn from 'classnames';

class FloatBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  handleClickOutside() {
    this.setState({ isOpen: false });
  }

  render () {
    const {
      actionBtn,
      arrow,
      customClass,
      children
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="float-box-wrapper">
        <div onClick={() => this.setState({ isOpen: !isOpen })}>{ actionBtn }</div>
        { isOpen && <div
          className={cn("float-box-content", arrow || 'top', customClass)}
        >
          { React.cloneElement(children, { doClose: this.handleClickOutside.bind(this) }) }
        </div> }
      </div>
    )
  }
};

FloatBox.defaultProps = {
  arrow: 'top',
  actionBtn: false,
  customClass: '',
};

FloatBox.propTypes = {
  arrow: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  customClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  actionBtn: PropTypes.element.isRequired,
};

export default enhanceWithClickOutside(FloatBox);
