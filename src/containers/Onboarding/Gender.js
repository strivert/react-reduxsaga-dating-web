
import React from 'react';

import PngMan from '../../static/images/onboarding/man.png';
import PngWoman from '../../static/images/onboarding/woman.png';

export default (props) => (
  <div className="onboarding onboarding__gender">
    <h1>Are you a Man or a Woman</h1>

    <div className="box-options">
      <div className="box-option variable-size" onClick={()=> props.goNext('gender', 'M', props.currentPath)}>
        <img src={PngMan} alt="man" />
        <span>Man</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('gender', 'F', props.currentPath)}>
        <img src={PngWoman} alt="woman" />
        <span>Woman</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
