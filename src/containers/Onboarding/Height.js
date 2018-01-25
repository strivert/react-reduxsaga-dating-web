
import React from 'react';
import SelectBox from "../../components/SelectBox";

export default (props) => (
  <div className="onboarding onboarding__height">
    <h1>How Tall Are You?</h1>
    <div className="box-options center">
      <SelectBox
        name="height"
        value={props.profileData.height || 170}
        choices={props.profile.height.available_values}
        onChange={val =>
          props.handleOnChange({
            target: { name: "height", value: val && val && val.value }
          })}
      />
    </div>

    <div className="action-footer">
      <button className="btn-action" onClick={() => props.goNext('height', null,  props.currentPath)}>Next</button>
    </div>
    <p>
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </p>
  </div>
);
