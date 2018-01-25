
import React from 'react';

import PngDating from '../../static/images/onboarding/dating.png';
import PngFellowship from '../../static/images/onboarding/fellowship.png';

export default (props) => (
  <div className="onboarding onboarding__goal">
    <h1>What Do You Hope to Find Here?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('inamatch', 'a soulmate', props.currentPath)}>
        <img src={PngDating} alt="Dating" />
        <span>Dating</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('inamatch', 'fellowship', props.currentPath)}>
        <img src={PngFellowship} alt="Fellowship" />
        <span>Fellowship</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
