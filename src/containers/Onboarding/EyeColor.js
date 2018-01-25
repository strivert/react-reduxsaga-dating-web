
import React from 'react';

import PngEyeBlue from '../../static/images/onboarding/eyes_blue.png';
import PngEyeBrown from '../../static/images/onboarding/eyes_brown.png';
import PngEyeGray from '../../static/images/onboarding/eyes_gray.png';
import PngEyeGreen from '../../static/images/onboarding/eyes_green.png';
import PngEyeHazel from '../../static/images/onboarding/eyes_hazel.png';
import PngOther from '../../static/images/onboarding/other.png';

export default (props) => (
  <div className="onboarding onboarding__eye-color">
    <h1>What Color Are Your Eyes?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('eye_color', 'blue', props.currentPath)}>
        <img src={PngEyeBlue} alt="Blue Eye" />
        <span>Blue</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('eye_color', 'brown', props.currentPath)}>
        <img src={PngEyeBrown} alt="Brown Eye" />
        <span>Brown</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('eye_color', 'grey', props.currentPath)}>
        <img src={PngEyeGray} alt="Grey Eye" />
        <span>Grey</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('eye_color', 'green', props.currentPath)}>
        <img src={PngEyeGreen} alt="Green Eye" />
        <span>Green</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('eye_color', 'hazel', props.currentPath)}>
        <img src={PngEyeHazel} alt="Hazel Eye" />
        <span>Hazel</span>
      </div>
      <div className="box-option variable-size other" onClick={()=> props.goNext('eye_color', 'other', props.currentPath)}>
        <img src={PngOther} alt="Other Eye" />
        <span>Other</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
