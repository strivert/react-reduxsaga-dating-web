
import React from 'react';

export default (props) => (
  <div className="onboarding onboarding__rate-look">
    <h1>How Would You Rate Your Looks?</h1>

    <div className="box-options center">
      <div className="box-option text-only" onClick={()=> props.goNext('looks', 'to be attractive', props.currentPath)}>
        <span>Attractive</span>
      </div>
      <div className="box-option text-only" onClick={()=> props.goNext('looks', 'to have average looks', props.currentPath)}>
        <span>Average</span>
      </div>
      <div className="box-option text-only" onClick={()=> props.goNext('looks', 'to be beautiful inside and out', props.currentPath)}>
        <span>Beautiful Inside and Out</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
