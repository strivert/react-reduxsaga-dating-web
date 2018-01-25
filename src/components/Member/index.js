import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import defaultAvatar from '../../uploads/default.jpg';

const Member = ({member, profileLink}) => {
	const avatar = member.primary_photo ? member.primary_photo.small_url : defaultAvatar;

	return (
		<div key={member.id} className="member">
			<img src={avatar} alt={member.user_name}/>
			<div className="member__info">
        { profileLink ?
          <Link to={`/profiles/${member.id}`}>
            <div className="username">{member.user_name}</div>
          </Link>
          :
          <div className="username">{member.user_name}</div>
        }
				<p className="bio">{member.age} • {member.location}</p>
			</div>
		</div>
	);
}

Member.propTypes = {
	member: PropTypes.object.isRequired,
  profileLink: PropTypes.bool
}

Member.defaultProps = {
  profileLink: true
}

export default Member;
