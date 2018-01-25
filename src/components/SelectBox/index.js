import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

/*
  @params [choices] Array
  In other to use this custom component, the  array MUST be of this format
  [{value: '1', label: '<Anything1>'}, {{value: '2', label: '<Anything2>'} ]
*/
const generateOptions = choices => {
  const options = [];
  choices.map((choice, idx) => {
    const option = {};
    if (typeof choice === 'object') {
      let [value, formattedValue] = Object.entries(choice);

      if (formattedValue) {
        option['label'] = formattedValue[1].toString();
        option['value'] = value[1].toString();
      }
    } else {
      option['label'] = choice.toString();
      option['value'] = choice.toString();
    }
    return options.push(option); 
  });
  
  return options;
};

const SelectBox = ({
  choices,
  name,
  className = '',
  onChange,
  value
}) => {
  return (
    <Select
      className={`selectbox ${className}`}
      name={name}
      placeholder=''
      options={generateOptions(choices)}
      onChange={onChange}
      value={value || ''}
    />
  );
};

SelectBox.propTypes = {
  choices: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SelectBox;
