
import React from 'react';

import PngSaver from '../../static/images/onboarding/saver.png';
import PngSpender from '../../static/images/onboarding/spender.png';

export default (props) => (
  <div className="onboarding onboarding__money">
    <h1>With Regards to Money, I am ...</h1>

    <div className="box-options center">
      <div className="box-option" onClick={()=> props.goNext('money', 'Save and use wisely', props.currentPath)}>
        <img src={PngSaver} alt="Saver" />
        <span>A Saver</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('money', 'Spend while you have it!', props.currentPath)}>
        <img src={PngSpender} alt="Spender" />
        <span>A Spender</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
