import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dashboardSelectors, notificationsSelectors } from '../../selectors';
import { dashboardActions, notificationsActions } from '../../actions';

import Notifications from './Notifications';
import ActivityFeed from './ActivityFeed';
import ProfileStatus from './ProfileStatus';
import NewMembers from './NewMembers';

class Dashboard extends Component {
	componentDidMount() {
		const {
			newMembers,
			userNotifications,
			fetchNewMembersRequest,
			fetchCurrentUserNotificationsRequest,
		} = this.props;

		if (newMembers.length === 0) {
			fetchNewMembersRequest()
		}

		if (userNotifications.length === 0) {
			fetchCurrentUserNotificationsRequest();
		}
	}

	render() {
		const { newMembers, userNotifications } = this.props;

		return (
			<div className="dashboard__space">
				<div className="dashboard">
					<div className="dashboard__main">
						<Notifications notifications={userNotifications} />
						<ActivityFeed />
					</div>
					<div className="dashboard__aside">
						<ProfileStatus />
						<NewMembers newMembers={newMembers} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		newMembers: dashboardSelectors.newMembersSelector(state),
		userNotifications: notificationsSelectors.userNotificationsSelector(state),
	}
}

const mapDispatchToProps = {
	fetchNewMembersRequest: dashboardActions.fetchNewMembersRequest,
	fetchCurrentUserNotificationsRequest: notificationsActions.fetchCurrentUserNotificationsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
