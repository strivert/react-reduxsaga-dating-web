
import React from 'react';

import Png20 from '../../static/images/onboarding/20-or-less.png';
import Png50 from '../../static/images/onboarding/50-or-less.png';
import Png100 from '../../static/images/onboarding/100-or-less.png';
import PngAny from '../../static/images/onboarding/any-distance.png';

export default (props) => (
  <div className="onboarding onboarding__travel">
    <h1>What Do You Hope to Find Here?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('driving_distance', 'within 20 miles', props.currentPath)}>
        <img src={Png20} alt="Within 20 miles" />
        <span>20 miles or less</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('driving_distance', 'within 50 miles', props.currentPath)}>
        <img src={Png50} alt="Within 50 miles" />
        <span>50 miles or less</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('driving_distance', 'within 100 miles', props.currentPath)}>
        <img src={Png100} alt="Within 100 miles" />
        <span>100 miles or less</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('driving_distance', 'any distance', props.currentPath)}>
        <img src={PngAny} alt="Any distance" />
        <span>Any distance</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
