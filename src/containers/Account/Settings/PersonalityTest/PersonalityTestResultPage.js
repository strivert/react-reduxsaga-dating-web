import React from 'react'
import sanitizeHtml from 'sanitize-html';

const PersonalityTestResult = ({result}) => {
  return(
    <div className="settings__personality-result">
     <h3>Personality Test Result</h3>
     <hr />
     <h3>Your Personality Traits</h3>
     <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(result.about_me_essay_html)}}></p>
     <h3>Your Ideal Partner's Personality Profile</h3>
     <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(result.about_my_ideal_partner_essay_html)}}></p>
    </div>
  )
}

export default PersonalityTestResult;