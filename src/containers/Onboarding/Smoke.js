
import React from 'react';

import PngSmokeYes from '../../static/images/onboarding/smoke-yes.png';
import PngSmokeNo from '../../static/images/onboarding/smoke-no.png';
import PngSmokeSometimes from '../../static/images/onboarding/drink-sometimes.png';


export default (props) => (
  <div className="onboarding onboarding__drink">
    <h1>Do you smoke?</h1>

    <div className="box-options center">
      <div className="box-option variable-size small-image" onClick={()=> props.goNext('smoke', 'yes', props.currentPath)}>
        <img src={PngSmokeYes} alt="Yes" />
        <span>Yes</span>
      </div>
      <div className="box-option variable-size small-image" onClick={()=> props.goNext('smoke', 'no', props.currentPath)}>
        <img src={PngSmokeNo} alt="No" />
        <span>No</span>
      </div>
      <div className="box-option variable-size small-image" onClick={()=> props.goNext('smoke', 'sometimes', props.currentPath)}>
        <img src={PngSmokeSometimes} alt="Sometimes" />
        <span>Sometimes</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
