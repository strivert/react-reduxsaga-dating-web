
import React from 'react';

import PngThumbUp from '../../static/images/onboarding/thumbsup.png';
import PngThumbDown from '../../static/images/onboarding/thumbsdown.png';

export default (props) => (
  <div className="onboarding onboarding__marry__in_church">
    <h1>Can I Marry Within the Church?</h1>

    <div className="box-options center">
      <div className="box-option" onClick={()=> props.goNext('marry_church', 'yes', props.currentPath)}>
        <img src={PngThumbUp} alt="Yes" />
        <span>Yes</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('marry_church', 'no', props.currentPath)}>
        <img src={PngThumbDown} alt="No" />
        <span>No</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
