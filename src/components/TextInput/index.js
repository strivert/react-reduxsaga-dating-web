import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ type, name, value, placeholder, className='', onChange, ...otherProps }) => {
  return (
    <input
      type={type}
      value={value? value: undefined}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={`${className} input`}
      {...otherProps}
    />
  );
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default TextInput;