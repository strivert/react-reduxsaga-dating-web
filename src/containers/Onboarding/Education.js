
import React from 'react';

import PngHighSchool from '../../static/images/onboarding/high-school.png';
import PngSomeCollege from '../../static/images/onboarding/some-college.png';
import PngCollegeDegree from '../../static/images/onboarding/college.png';
import PngAdvancedDegree from '../../static/images/onboarding/advanced.png';
import PngDoctorate from '../../static/images/onboarding/doctorate.png';
import PngOther from '../../static/images/onboarding/other.png';

export default (props) => (
  <div className="onboarding onboarding__travel">
    <h1>What Do You Hope to Find Here?</h1>

    <div className="box-options center">
      <div className="box-option variable-size" onClick={()=> props.goNext('education', 'highschool', props.currentPath)}>
        <img src={PngHighSchool} alt="High School" />
        <span>High School</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('education', 'some college', props.currentPath)}>
        <img src={PngSomeCollege} alt="Some College" />
        <span>Some College</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('education', 'college degree', props.currentPath)}>
        <img src={PngCollegeDegree} alt="College Degree" />
        <span>College Degree</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('education', 'an advanced degree', props.currentPath)}>
        <img src={PngAdvancedDegree} alt="An Advanced Degree" />
        <span>Advanced Degree</span>
      </div>
      <div className="box-option variable-size" onClick={()=> props.goNext('education', 'a doctorate', props.currentPath)}>
        <img src={PngDoctorate} alt="A Doctorate" />
        <span>Doctorate</span>
      </div>
      <div className="box-option variable-size other" onClick={()=> props.goNext('education', 'other', props.currentPath)}>
        <img src={PngOther} alt="Other" />
        <span>Other</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
