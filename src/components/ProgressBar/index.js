import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({current, total}) => {
  const width = current * 100 / total
  return (
    <div className="bar-container">
      <div className="bar">
        <div className="progress" style={{'width': `${width}%`}}></div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default ProgressBar;
