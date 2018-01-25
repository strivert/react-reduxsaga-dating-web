import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { accountSettingSelectors, helperSelectors, authSelectors } from '../../../../selectors';
import { accountSettingActions, helperActions } from '../../../../actions';
import AccountProfilePage from './AccountProfilePage';
import LocalSpinner from '../../../../components/LocalSpinner';

class AccountProfile extends Component {
  componentDidMount() {
    const {setComponentLoadingRequest, fetchAccountProfileRequest, profile} = this.props;
    if(!profile) {
      setComponentLoadingRequest(true);
      fetchAccountProfileRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  render() {
    const {
      profile,
      isLoading,
      notification,
      currentUser,
      dismissToaster,
      updateProfileRequest
    } = this.props;

    return (
      <LocalSpinner loaded={!isLoading}>
        <AccountProfilePage
          profile={profile}
          notification={notification}
          dismissToaster={dismissToaster}
          currentUser={currentUser}
          updateProfileRequest={updateProfileRequest}
        />
      </LocalSpinner>
    );
  }
}

AccountProfile.propTypes = {
  profile: PropTypes.object,
  notificaton: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  fetchAccountProfileRequest: PropTypes.func,
  updateProfileRequest: PropTypes.func,
  dismissToaster: PropTypes.func,
  currentUser: PropTypes.shape({
    show_states: PropTypes.bool,
    show_zipcodes: PropTypes.bool
  })
};

const mapStateToProps = state => {
  return createStructuredSelector({
    profile: accountSettingSelectors.selectAccountSettingsProfile(),
    notification: helperSelectors.selectNotification(),
    isLoading: helperSelectors.isLoadingSelector(),
    currentUser: authSelectors.selectCurrentUser()
  });
};

const mapDispatchToProps = {
  fetchAccountProfileRequest: accountSettingActions.fetchAccountProfileRequest,
  updateProfileRequest: accountSettingActions.updateProfileRequest,
  dismissToaster: helperActions.dismissToaster,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
