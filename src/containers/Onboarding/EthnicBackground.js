
import React from 'react';

export default (props) => (
  <div className="onboarding onboarding__ethnic-background">
    <h1>What is your ethnicity?</h1>

    <div className="box-options center">
      <div className="box-option  row3 text-only" onClick={()=> props.goNext('ethnic_background', 'Not Disclosed', props.currentPath)}>
        <span>Prefer not to say</span>
      </div>
      <div className="box-option row3 text-only" onClick={()=> props.goNext('ethnic_background', 'Caucasian', props.currentPath)}>
        <span>Caucasian</span>
      </div>
      <div className="box-option row3 text-only" onClick={()=> props.goNext('ethnic_background', 'African-American', props.currentPath)}>
        <span>African</span>
      </div>
      <div className="box-option row3 text-only" onClick={()=> props.goNext('ethnic_background', 'Asian', props.currentPath)}>
        <span>Asian</span>
      </div>
      <div className="box-option row3 text-only" onClick={()=> props.goNext('ethnic_background', 'Eastern Indian', props.currentPath)}>
        <span>Eastern Indian</span>
      </div>
      <div className="box-option row3 text-only" onClick={()=> props.goNext('ethnic_background', 'Hispanic', props.currentPath)}>
        <span>Hispanic</span>
      </div>
      <div className="box-option row3 text-only" onClick={()=> props.goNext('ethnic_background', 'Native American', props.currentPath)}>
        <span>Native American</span>
      </div>
      <div className="box-option row3 text-only" onClick={()=> props.goNext('ethnic_background', 'other', props.currentPath)}>
        <span>Other</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
