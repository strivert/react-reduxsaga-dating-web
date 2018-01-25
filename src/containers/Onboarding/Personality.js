
import React from 'react';

import PngExtrovert from '../../static/images/onboarding/extrovert.png';
import PngIntrovert from '../../static/images/onboarding/introvert.png';
import PngBoth from '../../static/images/onboarding/both.png';

export default (props) => (
  <div className="onboarding onboarding__personality">
    <h1>How Would You Classify Your Personality?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('personality', 'an extrovert', props.currentPath)}>
        <img src={PngExtrovert} alt="Extrovert" />
        <span>Extrovert</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('personality', 'an introvert', props.currentPath)}>
        <img src={PngIntrovert} alt="Introvert" />
        <span>Introvert</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('personality', 'Somewhere in middle', props.currentPath)}>
        <img src={PngBoth} alt="Both" />
        <span>A bit of both</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
