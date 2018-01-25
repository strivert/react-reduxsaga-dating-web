
import React from 'react';

import PngDrinkYes from '../../static/images/onboarding/drink-yes.png';
import PngDrinkNo from '../../static/images/onboarding/drink-no.png';
import PngDrinkSometimes from '../../static/images/onboarding/drink-sometimes.png';


export default (props) => (
  <div className="onboarding onboarding__drink">
    <h1>Do you drink?</h1>

    <div className="box-options center">
      <div className="box-option small-image" onClick={()=> props.goNext('drink', 'yes', props.currentPath)}>
        <img src={PngDrinkYes} alt="Yes" />
        <span>Yes</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('drink', 'no', props.currentPath)}>
        <img src={PngDrinkNo} alt="No" />
        <span>No</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('drink', 'sometimes', props.currentPath)}>
        <img src={PngDrinkSometimes} alt="Sometimes" />
        <span>Sometimes</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
