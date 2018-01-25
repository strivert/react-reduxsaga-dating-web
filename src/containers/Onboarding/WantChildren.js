
import React from 'react';

import PngThumbUp from '../../static/images/onboarding/childs.png';
import PngThumbDown from '../../static/images/onboarding/thumbsdown.png';
import PngNotSure from '../../static/images/onboarding/not-sure.png';

export default (props) => (
  <div className="onboarding onboarding__want__children">
    <h1>Do you want children?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('want_children', 'yes', props.currentPath)}>
        <img src={PngThumbUp} alt="Yes" />
        <span>Yes</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('want_children', 'no', props.currentPath)}>
        <img src={PngThumbDown} alt="No" />
        <span>No</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('want_children', 'undecided', props.currentPath)}>
        <img src={PngNotSure} alt="Not sure" />
        <span>I am not sure.</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
