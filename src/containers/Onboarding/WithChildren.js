
import React from 'react';

import PngThumbUp from '../../static/images/onboarding/childs.png';
import PngThumbDown from '../../static/images/onboarding/thumbsdown.png';
import PngNotSure from '../../static/images/onboarding/not-sure.png';
import PngOther from '../../static/images/onboarding/other.png';

export default (props) => (
  <div className="onboarding onboarding__with__children">
    <h1>Would you date someone with children?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('date_with_children', 'Yes', props.currentPath)}>
        <img src={PngThumbUp} alt="Yes" />
        <span>Yes!</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('date_with_children', 'No', props.currentPath)}>
        <img src={PngThumbDown} alt="No" />
        <span>No!</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('date_with_children', 'Undecided', props.currentPath)}>
        <img src={PngNotSure} alt="Not sure" />
        <span>I am not sure.</span>
      </div>
      <div className="box-option variable-size other" onClick={()=> props.goNext('date_with_children', 'No Preference', props.currentPath)}>
        <img src={PngOther} alt="No preference" />
        <span>No preference.</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
