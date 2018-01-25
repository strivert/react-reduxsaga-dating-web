import React from 'react'
import PropTypes from 'prop-types';

import ProfileActivity from './ProfileActivity';

const ProfileActivities = ({
	renderAll,
	activities,
	currentUser,
	currentMember,
	activityCount,	
	postCommentRequest,
	onViewAllActivities,
	likeMemberActivityRequest,
	unLikeMemberActivityRequest,
	postCommentOnMemberActivityRequest
}) => (
	<div className="activities-wrapper">
		<div className="profile__activities">
			<h2>Profile Activity:</h2>
			<div className="box-wrapper">
				{activities.map((activity, index) => {
						if(activity.id) {
							return <ProfileActivity
												key={index} 
												activity={activity}
												renderAll={renderAll}
												currentUser={currentUser}
												currentMember={currentMember}
												likeMemberActivityRequest={likeMemberActivityRequest}
												unLikeMemberActivityRequest={unLikeMemberActivityRequest}
												postCommentOnMemberActivityRequest={postCommentOnMemberActivityRequest}
										/>
						}
						return null;
					})}
			</div>
		</div>
		{activityCount > 2? 
			<div className="activities__btn">
				<p onClick={onViewAllActivities}>{`View ${renderAll ? 'fewer ': 'all'} activity for ${currentMember.user_name}`}</p>
			</div>: null}
	</div>
);

ProfileActivities.propTypes = {
	renderAll: PropTypes.bool.isRequired,
	currentUser: PropTypes.shape({
		user_id: PropTypes.number.isRequired,
		user_name: PropTypes.string.isRequired,
		comments: PropTypes.array,
		likes: PropTypes.array
	}),
	currentMember: PropTypes.shape({
		user_name: PropTypes.string,		
	}),
	activities: PropTypes.array.isRequired,
	onViewAllActivities: PropTypes.func,
	likeMemberActivityRequest: PropTypes.func.isRequired,
	unLikeMemberActivityRequest: PropTypes.func.isRequired,
	postCommentOnMemberActivityRequest: PropTypes.func.isRequired
}

export default ProfileActivities;

