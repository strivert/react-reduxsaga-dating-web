
import React from 'react';

import PngLover from '../../static/images/onboarding/thumbsup.png';
import PngAllergic from '../../static/images/onboarding/allergic.png';
import PngHater from '../../static/images/onboarding/thumbsdown.png';
import PngNoPref from '../../static/images/onboarding/thumbmaybe.png';

export default (props) => (
  <div className="onboarding onboarding__pets">
    <h1>How do you feel about pets?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('pets', 'I am an animal lover', props.currentPath)}>
        <img src={PngLover} alt="Love Pet" />
        <span>I love animals!</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('pets', 'Allergic to most pets!', props.currentPath)}>
        <img src={PngAllergic} alt="Allergic" />
        <span>I'm allergic</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('pets', 'Not fond of them at all', props.currentPath)}>
        <img src={PngHater} alt="Hate Pet" />
        <span>I don't like them</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('pets', 'No preference', props.currentPath)}>
        <img src={PngNoPref} alt="No Preference" />
        <span>No Preference</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
