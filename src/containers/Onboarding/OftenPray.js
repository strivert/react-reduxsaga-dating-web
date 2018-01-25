
import React from 'react';

import PngCalendarDaily from '../../static/images/onboarding/calendar-daily.png';
import PngCalendarWeekly from '../../static/images/onboarding/calendar-weekly.png';
import PngCalendarMonthly from '../../static/images/onboarding/calendar-monthly.png';
import PngCalendarRarely from '../../static/images/onboarding/other.png';

export default (props) => (
  <div className="onboarding onboarding__often__church">
    <h1>How often do I pray?</h1>

    <div className="box-options center">
      <div className="box-option small-image" onClick={()=> props.goNext('pray', 'Daily', props.currentPath)}>
        <img src={PngCalendarDaily} alt="Daily" />
        <span>Daily</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('pray', 'Weekly', props.currentPath)}>
        <img src={PngCalendarWeekly} alt="Weekly" />
        <span>Weekly</span>
      </div>
      <div className="box-option small-image" onClick={()=> props.goNext('pray', 'Monthly', props.currentPath)}>
        <img src={PngCalendarMonthly} alt="Few times a year" />
        <span>Few times a year</span>
      </div>
      <div className="box-option other small-image" onClick={()=> props.goNext('pray', 'Rarely', props.currentPath)}>
        <img src={PngCalendarRarely} alt="Rarely" />
        <span>Rarely</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
