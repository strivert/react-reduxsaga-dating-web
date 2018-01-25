
import React from 'react';

export default (props) => (
  <div className="onboarding onboarding__have-children">
    <h1>Do you have children?</h1>

    <div className="box-options center">
      <div className="box-option text-only" onClick={()=> props.goNext('children', 'no', props.currentPath)}>
        <span>No</span>
      </div>
      <div className="box-option text-only" onClick={()=> props.goNext('children', 'yef', props.currentPath)}>
        <span>Yes, they live with me full-time.</span>
      </div>
      <div className="box-option text-only" onClick={()=> props.goNext('children', 'yep', props.currentPath)}>
        <span>Yes, they live with me part-time.</span>
      </div>
      <div className="box-option text-only" onClick={()=> props.goNext('children', 'yen', props.currentPath)}>
        <span>Yes, but they don't live with me.</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
