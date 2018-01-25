import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { dashboardSelectors, helperSelectors, authSelectors } from '../../../selectors';
import { dashboardActions } from '../../../actions';

import ActivityCard from '../ActivityFeed/ActivityCard';
import LocalSpinner from '../../../components/LocalSpinner';

class SingleActivity extends Component {
	componentDidMount() {
		const {
			fetchSingleActivityRequest,
			singleActivity,
			match
		} = this.props;

		const activityId = match.params.activityId;

		if (!singleActivity) {
			fetchSingleActivityRequest(activityId);
		}
	}

	render() {
		const {
			isLoading, singleActivity, currentUser,
			likeSingleActivityRequest, unLikeSingleActivityRequest, postSingleCommentRequest
		} = this.props;

		return (
			<div className="single__activity">
	        	<LocalSpinner loaded={!isLoading} />
	        	{
	        		singleActivity && 
					<ActivityCard
						activity={singleActivity}
						currentUser={currentUser}
						isLoading={isLoading}
						likeActivityRequest={likeSingleActivityRequest}
						unLikeActivityRequest={unLikeSingleActivityRequest}
						postCommentRequest={postSingleCommentRequest}
					/>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return createStructuredSelector({
		isLoading: helperSelectors.isLoadingSelector(),
		singleActivity: (state) => dashboardSelectors.singleActivitySelector(state),
		currentUser: authSelectors.selectCurrentUser(),
	});
};

const mapDispatchToProps = {
	fetchSingleActivityRequest: dashboardActions.fetchSingleActivityRequest,
	likeSingleActivityRequest: dashboardActions.likeSingleActivityRequest,
	unLikeSingleActivityRequest: dashboardActions.unLikeSingleActivityRequest,
	postSingleCommentRequest: dashboardActions.postSingleCommentRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleActivity);
