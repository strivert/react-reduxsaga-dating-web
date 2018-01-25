import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Spinner from 'react-spinkit';

import { dashboardSelectors, authSelectors, helperSelectors, asyncSelectors } from '../../../selectors';
import { dashboardActions } from '../../../actions';

import ActivityCard from './ActivityCard';
import SelectDropdown from '../../../components/SelectDropdown';
import LocalSpinner from '../../../components/LocalSpinner';
import { FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST } from '../../../actions/types';

class ActivityFeed extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filter: 'all',
		}
	}
	loadActivities = (page) => {
		const { fetchAllMembersActivities, hasMore } = this.props;

		if (hasMore) {
			fetchAllMembersActivities(page, this.state.filter);
		}
	}

	filterActivities = (filter) => {
		this.setState({ filter });

		const { resetMembersActivities, fetchAllMembersActivities } = this.props;

		resetMembersActivities();
		fetchAllMembersActivities(1, filter);
	}

	componentDidMount() {
		const {activities, fetchAllMembersActivities } = this.props;

		if (activities.length === 0) {
			fetchAllMembersActivities(1)
		}
	}

	renderActivities() {
		const {
			activities,
			currentUser,
			isLoading,
			likeActivityRequest,
			unLikeActivityRequest,
			postCommentRequest
		} = this.props;

		if (activities.length > 0) {
			return activities.map((activity, index) => {
				if (activity.id) {
					return <ActivityCard
										key={index}
										activity={activity}
										currentUser={currentUser}
										isLoading={isLoading}
										likeActivityRequest={likeActivityRequest}
										unLikeActivityRequest={unLikeActivityRequest}
										postCommentRequest={postCommentRequest}
									/>
				}
				return null;
			});
		}

		return <div></div>;
	}

	render() {
		const selectFilters = [
			{value: 'all', label: 'View Activity For Users'},
			{value: 'search_preferences', label: 'View All Activity By Search Preferences'},
			{value: 'favorites', label: 'View All Activity By Favorites'},
			{value: 'my_area', label: 'View All User In My Area'},
		];

		const { statuses, activities } = this.props;

		return (
			<LocalSpinner loaded={ statuses[FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST] !== 'pending' || activities.length > 0 }>
				<div className="dashboard__activity">
					<div className="activity__filter">
						<p>Recent Activity</p>
						<div className="activity__filter__box">
							<SelectDropdown
								placeholder={"Filter Activity Feed By:"}
								items={selectFilters}
								onSelectOption={this.filterActivities}
							/>
						</div>
					</div>
					<InfiniteScroll
						pageStart={1}
						initialLoad={false}
						loadMore={this.loadActivities}
						hasMore={this.props.hasMore}
						loader={<div className="load-more-spinner"><Spinner name="ball-spin-fade-loader" /></div>}
					>
						{this.renderActivities()}
					</InfiniteScroll>
				</div>
			</LocalSpinner>
		);
	}
}

const mapStateToProps = (state) => {
	return createStructuredSelector({
		statuses: asyncSelectors.statusesSelector(),
		activities: dashboardSelectors.activitiesSelector(),
		hasMore: dashboardSelectors.hasMoreActivitiesSelector(),
		currentUser: authSelectors.selectCurrentUser(),
		isLoading: helperSelectors.isLoadingSelector()
	});
}

const mapDispatchToProps = {
	resetMembersActivities: dashboardActions.resetMembersActivities,
	fetchAllMembersActivities: dashboardActions.fetchAllMembersActivities,
	likeActivityRequest: dashboardActions.likeActivityRequest,
	unLikeActivityRequest: dashboardActions.unLikeActivityRequest,
	postCommentRequest: dashboardActions.postCommentRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFeed);
