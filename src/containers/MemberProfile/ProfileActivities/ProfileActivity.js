import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import InteractionsBox from '../../../components/InteractionsBox';
import CommentBox from '../../../components/CommentBox';
import ImageLightBox from '../../../components/ImageLightBox';
import defaultAvatar from '../../../uploads/default.jpg';

class Activity extends Component {
	state = {
		isOpen: false,
		photoIndex: 0
	}

	handleLikeActivity = ({activityId, likeId}) => {
		const {activity, currentUser, likeMemberActivityRequest, unLikeMemberActivityRequest} = this.props;
		const isLiked = activity['likes'].some(like => like.user_id === currentUser.user_id);

		if(isLiked) {
			unLikeMemberActivityRequest(activityId, likeId);
		} else {
			likeMemberActivityRequest(activityId);
		}
	}

	generateActivityBody() {
		const { data, kind } = this.props.activity;

		switch (kind) {
			case 'edited_profile':
				return data.map((activity, index) => {
					const action = Object.keys(activity)[0];
					const value = Object.values(activity)[0];

					return (
						<div key={index}>
							<h4>{action}:</h4>
							<span>
								{value}
							</span>
						</div>
					);
				});
			case 'added_photos':
				return data.map((photo, index) => {
					return (
						<img src={photo.small_url} key={photo.id} onClick={() => this.setState({isOpen: true, photoIndex: index})} alt="added" />
					);
				});
			default:
				return;
		}
	}

	render() {
		const {activity, currentUser, currentMember, postCommentOnMemberActivityRequest} = this.props;
		const {isOpen, photoIndex} = this.state;
		
		const {profile, id, comments, likes, create_at, kind} = activity;
		const avatar = (currentUser && currentUser.profile_photo_url_small) || defaultAvatar;		
		const pronoun = profile.gender === 'M' ? 'his': 'her';
		const activityKinds = {
			'joined': 'just joined CatholicSingles',
			'edited_profile': `edited ${pronoun} profile`,
			'added_photos': 'added new photos',
			'completed_compatibility_test': `just completed ${pronoun} compatibility test`,
		}
		
		const like = likes.filter(i => i.user_id === currentUser.user_id)[0];
		let images;
		if(kind === 'added_photos') {
			images = activity.data.map(photo => photo.medium_url); 
		}

		return (
			<article className="profile__activities__activity">
				<p className="activity__date">{moment(create_at).format('MMM D h:mma')}</p>
				<h3 className="activity__title">{currentMember.user_name} {activityKinds[kind]}</h3>
				<div className="activity__body">
					{this.generateActivityBody()}
				</div>
				{isOpen && <ImageLightBox 
					photoIndex={photoIndex} 
					images={images}
					onCloseRequest={() => this.setState({isOpen: false})}/>}
				<InteractionsBox 
					activityLike={this.handleLikeActivity}
					activityId={id}
					likeId={like && like.id}
				/>
				<div className="activity__comments">
					<CommentBox 
						comments={comments}
						activityId={id}
						avatar={avatar}
						likes_count={likes.length}
						postCommentRequest={postCommentOnMemberActivityRequest}
					/>
				</div>
			</article>
		);
	}
}

Activity.propTypes = {
	activity: PropTypes.object.isRequired,
	currentUser: PropTypes.shape({
		user_id: PropTypes.number,
		profile_photo_url_small: PropTypes.string
	}),
	currentMember: PropTypes.shape({
		id: PropTypes.number,
		user_name: PropTypes.string
	}),
	postCommentOnActivityRequest: PropTypes.func,
};

export default Activity;