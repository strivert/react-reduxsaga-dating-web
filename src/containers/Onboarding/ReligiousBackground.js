
import React from 'react';

import PngCatholic from '../../static/images/onboarding/catholic.png';
import PngCatachumen from '../../static/images/onboarding/catachumen.png';
import PngNotCatholic from '../../static/images/onboarding/annuled.png';

export default (props) => (
  <div className="onboarding onboarding__religious__background">
    <h1>What is your religion?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('catholicity', 'catholic', props.currentPath)}>
        <img src={PngCatholic} alt="Catholic" />
        <span>Catholic</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('catholicity', 'catachumen', props.currentPath)}>
        <img src={PngCatachumen} alt="Catachumen" />
        <span>Catachumen</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('catholicity', 'noncatholic', props.currentPath)}>
        <img src={PngNotCatholic} alt="Not Catholic" />
        <span>Not Catholic</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
