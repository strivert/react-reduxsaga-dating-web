import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, onClick, children, className="" }) => 
  <button
    type={type}
    onClick={onClick}
    className={`button ${className}`}
  >
    {children}
  </button>

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Button;