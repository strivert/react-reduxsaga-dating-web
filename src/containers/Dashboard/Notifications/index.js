import React, { Component } from 'react';
import Notification from '../../../components/Notification'
import { connect } from 'react-redux';
import { dashboardActions } from '../../../actions'
import { dashboardSelectors } from '../../../selectors'

class Notifications extends Component {
  componentDidMount() {
    const { fetchNotificationsRequest } = this.props;
    fetchNotificationsRequest();
  }

	render() {
    const { notifications } = this.props;

    if(notifications.size > 0) {
      return (
        <div className="dashboard__notifications">
          { notifications.map((notification, index) =>
            <Notification key={index} notification={notification} />
          )}
        </div>
      );
    }
    else {
      return null
    }

	}
}

const mapStateToProps = (state) => {
	return {
		notifications: dashboardSelectors.notificationSelector(state),
	}
}

const mapDispatchToProps = {
  fetchNotificationsRequest: dashboardActions.fetchNotificationsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
