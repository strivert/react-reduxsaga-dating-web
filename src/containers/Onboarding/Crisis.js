
import React from 'react';

export default (props) => (
  <div className="onboarding onboarding__crisis">
    <h1>When Dealing With a Crisis...</h1>

    <div className="box-options center">
      <div className="box-option text-only" onClick={()=> props.goNext('crisis', 'Proactive', props.currentPath)}>
        <span>I am Proactive</span>
      </div>
      <div className="box-option text-only" onClick={()=> props.goNext('crisis', 'Reactive', props.currentPath)}>
        <span>I am Reactive</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
