
import React from 'react';

import PngWAuburn from '../../static/images/onboarding/w_hair_auburn.png';
import PngWGray from '../../static/images/onboarding/w_hair_gray.png';
import PngWBlack from '../../static/images/onboarding/w_hair_black.png';
import PngWRed from '../../static/images/onboarding/w_hair_red.png';
import PngWBrown from '../../static/images/onboarding/w_hair_brown.png';
import PngWSilver from '../../static/images/onboarding/w_hair_silver.png';
import PngWBlonde from '../../static/images/onboarding/w_hair_blonde.png';
import PngWWhite from '../../static/images/onboarding/w_hair_white.png';

import PngMAuburn from '../../static/images/onboarding/m_hair_auburn.png';
import PngMGray from '../../static/images/onboarding/m_hair_gray.png';
import PngMBlack from '../../static/images/onboarding/m_hair_black.png';
import PngMRed from '../../static/images/onboarding/m_hair_red.png';
import PngMBrown from '../../static/images/onboarding/m_hair_brown.png';
import PngMSilver from '../../static/images/onboarding/m_hair_silver.png';
import PngMBlonde from '../../static/images/onboarding/m_hair_blonde.png';
import PngMWhite from '../../static/images/onboarding/m_hair_white.png';

import PngOther from '../../static/images/onboarding/other.png';

export default (props) => (
  <div className="onboarding onboarding__hair__color">
    <h1>What Color Is Your Hair?</h1>

    <div className="box-options center">
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'auburn', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMAuburn : PngWAuburn} alt="Auburn Hair" />
        <span>Auburn</span>
      </div>
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'gray', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMGray : PngWGray} alt="Gray Hair" />
        <span>Gray</span>
      </div>
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'black', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMBlack : PngWBlack} alt="Black Hair" />
        <span>Black</span>
      </div>
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'red', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMRed : PngWRed} alt="Red Hair" />
        <span>Red</span>
      </div>
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'brown', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMBrown : PngWBrown} alt="Brown Hair" />
        <span>Brown</span>
      </div>
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'silver', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMSilver : PngWSilver} alt="Silver Hair" />
        <span>Silver</span>
      </div>
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'blonde', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMBlonde : PngWBlonde} alt="Blonde Hair" />
        <span>Blonde</span>
      </div>
      <div className="box-option variable-size row3" onClick={()=> props.goNext('hair_color', 'white', props.currentPath)}>
        <img src={props.profileData.gender === 'M' ? PngMWhite : PngWWhite} alt="White Hair" />
        <span>White</span>
      </div>
      <div className="box-option variable-size  row3 other" onClick={()=> props.goNext('hair_color', 'other', props.currentPath)}>
        <img src={PngOther} alt="Other Hair" />
        <span>Other</span>
      </div>
    </div>
    <div className="action-footer">
      <a className="prev-link" onClick={() => props.goPrev()}>&lt; Go Back to Change Previous Answer</a>
    </div>
  </div>
);
