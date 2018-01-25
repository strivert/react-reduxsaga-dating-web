import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { accountSettingSelectors, helperSelectors, authSelectors } from '../../../../selectors';
import { accountSettingActions, helperActions } from '../../../../actions';
import SubscriptionPlanPage from './SubscriptionPlanPage';
import LocalSpinner from '../../../../components/LocalSpinner';

class SubscriptionPlan extends Component {

  state = {
    selectedIndex: 0,
    errors: null,
  }

  componentDidMount() {
    const {setComponentLoadingRequest, fetchAccountUpgradePlansRequest, profile} = this.props;
    if(!profile) {
      setComponentLoadingRequest(true);
      fetchAccountUpgradePlansRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  onSelectPlan = (selectedIndex) => this.setState({selectedIndex});

  render() {
    const {
      profile,
      isLoading,
      notification,
      currentUser,
      dismissToaster,
      updateProfileRequest,
      pricePlans,
      setComponentLoadingRequest,
      fetchAccountUpgradePlansRequest,
    } = this.props;

    const { selectedIndex } = this.state;

    return (
      <LocalSpinner loaded={!isLoading}>
        <SubscriptionPlanPage
          profile={profile}
          notification={notification}
          currentUser={currentUser}
          dismissToaster={dismissToaster}
          selectedIndex={selectedIndex}
          onSelectPlan={this.onSelectPlan}
          pricePlans={pricePlans}
          setComponentLoadingRequest={setComponentLoadingRequest}
          fetchAccountUpgradePlansRequest={fetchAccountUpgradePlansRequest}
          updateProfileRequest={updateProfileRequest}
        />
      </LocalSpinner>
    );
  }
}

SubscriptionPlan.propTypes = {
  profile: PropTypes.object,
  notificaton: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  fetchAccountUpgradePlansRequest: PropTypes.func,
  updateProfileRequest: PropTypes.func,
  dismissToaster: PropTypes.func,
  currentUser: PropTypes.shape({
    show_states: PropTypes.bool,
    show_zipcodes: PropTypes.bool
  })
};

const mapStateToProps = state => {
  return createStructuredSelector({
    pricePlans: accountSettingSelectors.selectAccountSettingsPricePlans(),
    token: accountSettingSelectors.selectAccountSettingsUpgradeToken(),
    profile: accountSettingSelectors.selectAccountSettingsProfile(),
    notification: helperSelectors.selectNotification(),
    isLoading: helperSelectors.isLoadingSelector(),
    currentUser: authSelectors.selectCurrentUser()
  });
};

const mapDispatchToProps = {
  fetchAccountUpgradePlansRequest: accountSettingActions.fetchAccountUpgradePlansRequest,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
  postAccountUpgradeRequest: accountSettingActions.postAccountUpgradeRequest,
  updateProfileRequest: accountSettingActions.updateProfileRequest,
  dismissToaster: helperActions.dismissToaster
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPlan);
