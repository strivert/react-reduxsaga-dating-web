
import React from 'react';

import PngSingle from '../../static/images/onboarding/single.png';
import PngWidowed from '../../static/images/onboarding/widowed.png';
import PngSeparated from '../../static/images/onboarding/separated.png';
import PngAnnuled from '../../static/images/onboarding/annuled.png';
import PngDivoced from '../../static/images/onboarding/divoced.png';

export default (props) => (
  <div className="onboarding onboarding__marital-status">
    <h1>My Relationship Past?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('marital_status', 'single', props.currentPath)}>
        <img src={PngSingle} alt="Single" />
        <span>Single</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('marital_status', 'widowed', props.currentPath)}>
        <img src={PngWidowed} alt="Widowed" />
        <span>Widowed</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('marital_status', 'separated', props.currentPath)}>
        <img src={PngSeparated} alt="Separated" />
        <span>Separated</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('marital_status', 'previous marriage annulled', props.currentPath)}>
        <img src={PngAnnuled} alt="Annuled" />
        <span>Annuled</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('marital_status', 'divoced', props.currentPath)}>
        <img src={PngDivoced} alt="Divorced" />
        <span>Divoced</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
