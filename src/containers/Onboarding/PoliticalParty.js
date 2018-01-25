
import React from 'react';

import PngConservative from '../../static/images/onboarding/conservative.png';
import PngLiberal from '../../static/images/onboarding/liberal.png';
import PngModerate from '../../static/images/onboarding/moderate.png';
import PngNotToSay from '../../static/images/onboarding/not-to-say.png';

export default (props) => (
  <div className="onboarding onboarding__political__party">
    <h1>Politically, I consider myself...</h1>

    <div className="box-options center">
      <div className="box-option small-image" onClick={()=> props.goNext('politics', 'conservative', props.currentPath)}>
        <img src={PngConservative} alt="Conservative" />
        <span>Conservative</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('politics', 'liberal', props.currentPath)}>
        <img src={PngLiberal} alt="Liberal" />
        <span>Liberal</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('politics', 'moderate', props.currentPath)}>
        <img src={PngModerate} alt="Moderate" />
        <span>Moderate</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('politics', 'noanswer', props.currentPath)}>
        <img src={PngNotToSay} alt="Prefer not to say" />
        <span>Prefer not to say</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
