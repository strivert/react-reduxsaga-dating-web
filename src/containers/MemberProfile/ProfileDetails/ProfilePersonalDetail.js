import React from 'react'
import PropTypes from 'prop-types';
import womanIcon from '../../../static/images/woman.svg'


const ProfilePersonalDetails = ({member}) => {
  return (
    <div className="content-wrapper">
        <article className="profile__details__personal">
          <div className="section-icon">
            <img src={womanIcon} alt=""/>
          </div>
          <div className="section-content">
            <h3 className="section-title">Details</h3>
            <p>
              <em>Gender: <span>{member.gender === 'F' ? 'Female': 'Male'}</span>, </em>
              { member.height && <em>Height: <span>{member.height}</span></em> }
            </p>
            { member.ethnic_background && <p>Ethnicity: <span>{member.ethnic_background}</span></p> }
            <p>
              { member.hair_color && <em>Hair: <span>{member.hair_color}</span>, </em> }
              { member.eye_color && <em>Eyes: <span>{member.eye_color}</span></em> }
            </p>
            { member.activity_level && <p>Activity Level: <span>{member.activity_level}</span></p> }
            { member.personality && <p>Personality: <span>{member.personality}</span></p> }
            <p>
              { member.parish && <em>Parish: <span>{member.parish}</span>, </em> }
              { member.catholicity && <em>Catholicity: <span>{member.catholicity}</span></em> }
            </p>
            <p>
              { member.marital_status && <em>Status: <span>{member.marital_status}</span>, </em> }
              { member.inmatch && <em>In search of: <span>{member.inamatch}</span></em> }
            </p>
            { member.education && <p>Education: <span>{member.education}</span></p> }
            { member.occupation && <p>Occupation: <span>{member.occupation}</span></p> }
          </div>
        </article>
    </div>
  );
};

ProfilePersonalDetails.propTypes = {
  member: PropTypes.object.isRequired
}

export default ProfilePersonalDetails;