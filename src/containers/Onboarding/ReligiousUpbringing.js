
import React from 'react';

import PngUpbringCatholic from '../../static/images/onboarding/upbring-catholic.png';
import PngUpbringMixedChristian from '../../static/images/onboarding/upbringing-mixed-christian.png';
import PngUpbringNonChristian from '../../static/images/onboarding/upbring-non-christian.png';


export default (props) => (
  <div className="onboarding onboarding__religious_upbringing">
    <h1>What was your religious upbringing?</h1>

    <div className="box-options center">
      <div className="box-option small-image" onClick={()=> props.goNext('raised_in', 'catholic', props.currentPath)}>
        <img src={PngUpbringCatholic} alt="Catholic" />
        <span>Catholic</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('raised_in', 'christian', props.currentPath)}>
        <img src={PngUpbringMixedChristian} alt="Mixed Christian" />
        <span>Mixed Christian</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('raised_in', 'nonchristian', props.currentPath)}>
        <img src={PngUpbringNonChristian} alt="Non-Christian" />
        <span>Non-Christian</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
