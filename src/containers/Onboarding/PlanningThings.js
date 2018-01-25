
import React from 'react';

import PngPlanMyself from '../../static/images/onboarding/plan-myself.png';
import PngOptionsOpen from '../../static/images/onboarding/options-open.png';

export default (props) => (
  <div className="onboarding onboarding__planning__things">
    <h1>When Planning Things</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('planning', 'I prefer to plan ahead', props.currentPath)}>
        <img src={PngPlanMyself} alt="Plan Myself" />
        <span>I plan every detail</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('planning', 'I like to keep my options open and be spontaneous', props.currentPath)}>
        <img src={PngOptionsOpen} alt="Options Open" />
        <span>I keep my options open</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
