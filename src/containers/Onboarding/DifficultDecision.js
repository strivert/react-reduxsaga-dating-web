
import React from 'react';

import PngDecisive from '../../static/images/onboarding/decisive.png';
import PngSecondGuess from '../../static/images/onboarding/second-guessing.png';
import PngEar from '../../static/images/onboarding/ear.png';

export default (props) => (
  <div className="onboarding onboarding__difficult__decision">
    <h1>If I Have to Make a Difficult Decision?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('difficult_situation', 'I am a decisive person', props.currentPath)}>
        <img src={PngDecisive} alt="Decisive" />
        <span>I am decisive</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('difficult_situation', 'I second guess myself often', props.currentPath)}>
        <img src={PngSecondGuess} alt="Second Guess" />
        <span>I second guess myself</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('difficult_situation', 'I play it by ear!', props.currentPath)}>
        <img src={PngEar} alt="Play by ear" />
        <span>I play it by ear</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
