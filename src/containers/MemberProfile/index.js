import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ImageSlider from '../../components/ImageSlider';
import ProfileActions from './ProfileActions';
import ProfileActivities from './ProfileActivities';
import ProfileDetails from './ProfileDetails';
import LocalSpinner from '../../components/LocalSpinner';
import ProfilePersonalDetail from './ProfileDetails/ProfilePersonalDetail';
import PersonalityResultDetail from './ProfileDetails/PersonalityResultDetail';
import {
	memberProfileSelectors,
	helperSelectors,
	authSelectors,
	messagesSelectors
} from '../../selectors';

import {
	memberProfileActions,
	helperActions
} from '../../actions';


class MemberProfile extends Component {
	state = {
		renderAll: false
	}

	componentDidMount() {
		const {
			fetchCurrentMemberRequest,
			setComponentLoadingRequest,
			currentMember,
			match
		} = this.props;
		const memberId = match.params.userId

		if (!currentMember || currentMember.id !== memberId) {
			setComponentLoadingRequest(true);
			fetchCurrentMemberRequest(memberId);
		} else {
			setComponentLoadingRequest(false);
		}
	}

	handleViewAllActivities = () => {
		this.setState(prevState => ({
			renderAll: !prevState.renderAll
		}))
	}

  computeActiviitesToRender(){
		const {renderAll}  = this.state;
		const {memberActivities} = this.props;
		const activitiesCount = memberActivities.length;
    const sortedActivities = memberActivities.sort((a, b) => a.id - b.id);
    const fewerActivities = (activitiesCount - 2) > 0? (activitiesCount - 2) : 0;
		const activities = renderAll? sortedActivities: sortedActivities.slice(fewerActivities);
		
		return activities;
	}

	renderProfile() {
		const {currentMember, currentUser, likeMemberActivityRequest, unLikeMemberActivityRequest, memberActivities, postCommentOnMemberActivityRequest, isSending } = this.props;
		
		if (currentMember) {		
			const {user_name: username, age, location, photos} = currentMember;
			const {renderAll} = this.state;
			const activities = this.computeActiviitesToRender();
			const activityCount = memberActivities.filter(i => i.id !== null).length;
			const isCurrentUserProfile = (currentUser.user_id === currentMember.id);

			return (
				<div className="profile">
					<div className="header__section">
						<section>
							<div className="profile__header">
								{ currentMember.last_messaged_at &&
									<p className="profile__header__notification">You have previously messaged this user.</p>
								}
								<ImageSlider
									images={photos}
									user={{username, age, location}}
									member={currentMember}
									isSending={isSending}
								/>
							</div>
							{!isCurrentUserProfile && <ProfileActions member={currentMember} />}
						</section>
						<div className="profile__details">
							<ProfilePersonalDetail member={currentMember} />
						</div>
					</div>
					<div className="activities__details__section">
						<ProfileActivities
							renderAll={renderAll}
							activities={activities}
							currentUser={currentUser}
							activityCount={activityCount}
							currentMember={currentMember}
							onViewAllActivities={this.handleViewAllActivities}
							likeMemberActivityRequest={likeMemberActivityRequest}
							unLikeMemberActivityRequest={unLikeMemberActivityRequest}
							postCommentOnMemberActivityRequest={postCommentOnMemberActivityRequest}
						/>
						<section className="details__section">
							<ProfileDetails member={currentMember} />
						</section>
						{currentMember.compatibility && <PersonalityResultDetail personalityTestResult={currentMember.compatibility} />}
					</div>
				</div>
			);
		}

		return <div></div>;
	}

	render() {
		const { isLoading } = this.props;

		return (
			<LocalSpinner loaded={!isLoading}>
				{this.renderProfile()}
			</LocalSpinner>
		);
	}
}

const mapStateToProps = state => {
	return createStructuredSelector({
		currentMember: memberProfileSelectors.currentMemberProfileSelector(),
		currentUser: authSelectors.selectCurrentUser(),
		memberActivities: memberProfileSelectors.currentMemberActivitiesSelector(),
		isLoading: helperSelectors.isLoadingSelector(),
		isSending: messagesSelectors.isSendingMessageSelector()
	});
};

const mapDispatchToProps = {
	fetchCurrentMemberRequest: memberProfileActions.fetchCurrentMemberRequest,
	setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
	likeMemberActivityRequest: memberProfileActions.likeMemberActivityRequest,
	unLikeMemberActivityRequest: memberProfileActions.unLikeMemberActivityRequest,
	postCommentOnMemberActivityRequest: memberProfileActions.postCommentOnMemberActivityRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberProfile);
