
import React from 'react';

import PngMessy from '../../static/images/onboarding/messy.png';
import PngNeat from '../../static/images/onboarding/clean.png';

export default (props) => (
  <div className="onboarding onboarding__clean__neat">
    <h1>Are You Messy or Neat?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('tendtobe', 'A bit messy at times', props.currentPath)}>
        <img src={PngMessy} alt="Messy" />
        <span>Messy</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('tendtobe', 'Very neat and orderly', props.currentPath)}>
        <img src={PngNeat} alt="Neat" />
        <span>Neat</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
