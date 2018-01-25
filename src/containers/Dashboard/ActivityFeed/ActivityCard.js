import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import InteractionsBox from '../../../components/InteractionsBox';
import CommentBox from '../../../components/CommentBox';
import ImageLightBox from '../../../components/ImageLightBox';
import defaultAvatar from '../../../uploads/default.jpg';

class ActivityCard extends Component {
	state = {
		isOpen: false,
		photoIndex: 0
	}

	handleLikeActivity = ({activityId, likeId}) => {
		const {activity, currentUser} = this.props;
		const isLiked = activity['likes'].some(like => like.user_id === currentUser.user_id);

		if(isLiked) {
			this.props.unLikeActivityRequest(activityId, likeId);
		} else {
			this.props.likeActivityRequest(activityId);
		}
	}

	generateCardBody() {
		const { data, kind } = this.props.activity;

		switch (kind) {
      case 'upgrade_offer':
        return (
          <div dangerouslySetInnerHTML={{__html: data}} />
        );
			case 'edited_profile':
				return data.map((activity, index) => {
					const action = Object.keys(activity)[0];
					const value = Object.values(activity)[0];

					return (
						<div key={index}>
							<h4>{action}:</h4>
							<p>
								{value}
							</p>
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

  pronoun() {
    const profile = this.props.activity.profile
    if(profile && profile.gender === 'M') {
      return 'his'
    }
    else if(profile && profile.gender === 'F') {
      return 'her'
    }
    else {
      return 'their'
    }
  }

	render() {
		const { activity, currentUser, postCommentRequest } = this.props;
		const {isOpen, photoIndex} = this.state;
		
		const {profile, created_at, kind, comments, likes, id} = activity;
		const avatar = profile && profile.primary_photo ? profile.primary_photo.small_url: defaultAvatar;
		const activityKinds = {
			'joined': `just joined CatholicSingles`,
			'edited_profile': `edited ${this.pronoun()} profile`,
			'added_photos': 'added new photos',
			'completed_compatibility_test': `just completed ${this.pronoun()} compatibility test`,
      'upgrade_offer': ''
		}

		const like = likes.filter(i => i.user_id === currentUser.user_id)[0];
		let images;
		if(kind === 'added_photos') {
			images = activity.data.map(photo => photo.medium_url); 
		}
		
		return (
			<div className="activity__card">
				<div className="card__header">
          { profile && <img src={avatar} alt={profile.user_name} className="card__profile__picture"/> }
          <p></p>
				</div>
				<h3 className="card__title">
          { profile && <Link to={`/profiles/${profile.id}`}>{profile.user_name}</Link> }
          { created_at && <p className="date">{moment(created_at).format('MMM D')} - {moment(created_at).format('hh:mma')}</p> }
					{activityKinds[kind]}
					{(kind === 'joined' && profile) && <p>Let {profile.user_name} know that they are welcome here! Say hi in the comments below!</p>}
				</h3>
				<div  className="card__body">
					{this.generateCardBody()}
				</div>
				{isOpen && <ImageLightBox 
					photoIndex={photoIndex} 
					images={images}
					onCloseRequest={() => this.setState({isOpen: false})} />}
        { kind !== 'upgrade_offer' &&
          <InteractionsBox 
            activityLike={this.handleLikeActivity} 
            activityId={id}
            likeId={like && like.id}
          />
        }
        { kind !== 'upgrade_offer' &&
          <CommentBox 
            comments={comments} 
            activityId={id}
            avatar={avatar}
            likeId={like && like.id}					
            likes_count={likes.length}
            currentUser={currentUser}
            postCommentRequest={postCommentRequest}
          />
        }
			</div>
		);
	}
}

export default ActivityCard;
