import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateProfile from './UpdateProfile';
import CircularPercentIndicator from './CircularPercentIndicator';

import { dashboardActions } from '../../../actions';
import { dashboardSelectors } from '../../../selectors';

class ProfileStatus extends Component {
	componentDidMount() {
		const { profile,  fetchNextProfileItemRequest} = this.props;

		if (!profile) {
			fetchNextProfileItemRequest();
		}
	}

	render() {
		const { percentComplete, profile, updateProfileItemRequest } = this.props;
		let profileItem, attribute;

		if (profile) {
			profileItem = profile.profileItem;
			attribute = profile.attribute;
		}

    if(percentComplete < 100) {
      return (
        <div className="profile-status">
          <div className="profile-status__complete">
            <CircularPercentIndicator percentComplete={percentComplete} />
          </div>
          <div className="profile-status__submit">
            <h4>Help Complete Your Profile:</h4>
            {
              profileItem ? <p>{profileItem.label}</p> : <p></p>
            }
            <UpdateProfile
              onSubmit={updateProfileItemRequest}
              profileItem={profileItem}
              attribute={attribute}
            />
          </div>
        </div>
      );
    }
    else {
      return null;
    }
	}
}

const mapStateToProps = (state) => {
	return {
		profile: dashboardSelectors.profileItemSelector(state),
		percentComplete: dashboardSelectors.percentCompleteSelector(state)
	};
};

const mapDispatchToProps = {
	fetchNextProfileItemRequest: dashboardActions.fetchNextProfileItemRequest,
	updateProfileItemRequest: dashboardActions.updateProfileItemRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatus);
