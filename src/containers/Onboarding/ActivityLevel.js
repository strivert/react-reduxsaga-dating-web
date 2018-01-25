
import React from 'react';

import PngVeryActive from '../../static/images/onboarding/very_active.png';
import PngActive from '../../static/images/onboarding/active.png';
import PngWeekendWarrior from '../../static/images/onboarding/weekend_warrior.png';
import PngChannelSurfer from '../../static/images/onboarding/channel_surfer.png';

export default (props) => (
  <div className="onboarding onboarding__activity-level">
    <h1>How Active Are You?</h1>

    <div className="box-options center">
      <div className="box-option" onClick={()=> props.goNext('activity_level', 'very-active', props.currentPath)}>
        <img src={PngVeryActive} alt="Very Active" />
        <span>Very Active</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('activity_level', 'active', props.currentPath)}>
        <img src={PngActive} alt="Very Active" />
        <span>Active</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('activity_level', 'weekend_warrior', props.currentPath)}>
        <img src={PngWeekendWarrior} alt="Very Active" />
        <span>Weekend Warrior</span>
      </div>
      <div className="box-option" onClick={()=> props.goNext('activity_level', 'inactive', props.currentPath)}>
        <img src={PngChannelSurfer} alt="Very Active" />
        <span>Channel Surfer</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
