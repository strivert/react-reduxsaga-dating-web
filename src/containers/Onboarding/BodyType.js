
import React from 'react';

import PngAthletic from '../../static/images/onboarding/body_type_athletic.png';
import PngAverage from '../../static/images/onboarding/body_type_average.png';
import PngFewExtra from '../../static/images/onboarding/body_type_fewextra.png';
import PngHeavy from '../../static/images/onboarding/body_type_heavy.png';
import PngSlender from '../../static/images/onboarding/body_type_slender.png';

export default (props) => (
  <div className="onboarding onboarding__body-type">
    <h1>How Would You Describe Your Body Type?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('weight', 'Slender', props.currentPath)}>
        <img src={PngSlender} alt="slender" />
        <span>Slender</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('weight','Average', props.currentPath)}>
        <img src={PngAverage} alt="average" />
        <span>Average</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('weight','Athletic', props.currentPath)}>
        <img src={PngAthletic} alt="athletic" />
        <span>Athletic</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('weight','A Few Extra Pounds', props.currentPath)}>
        <img src={PngFewExtra} alt="few extra" />
        <span>A Few Extra Pounds</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('weight','Heavy', props.currentPath)}>
        <img src={PngHeavy} alt="heavy" />
        <span>Heavy</span>
      </div>
    </div>
    <div className="boarding-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
