
import React from 'react';

import PngOldest from '../../static/images/onboarding/oldest_child.png';
import PngMiddle from '../../static/images/onboarding/middle_child.png';
import PngYoungest from '../../static/images/onboarding/youngest_child.png';
import PngOnly from '../../static/images/onboarding/only_child.png';

export default (props) => (
  <div className="onboarding onboarding__family-order">
    <h1>Where were you in your family?</h1>

    <div className="box-options center">
      <div className="box-option" onClick={()=> props.goNext('birth_order', 'the oldest child', props.currentPath)}>
        <img src={PngOldest} alt="Oldest Child" />
        <span>Oldest Child</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('birth_order', 'a middle child', props.currentPath)}>
        <img src={PngMiddle} alt="Middle Child" />
        <span>Middle Child</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('birth_order', 'the youngest child', props.currentPath)}>
        <img src={PngYoungest} alt="Youngest Child" />
        <span>Youngest Child</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('birth_order', 'an only child', props.currentPath)}>
        <img src={PngOnly} alt="Only Child" />
        <span>Only Child</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
