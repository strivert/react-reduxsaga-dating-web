import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { accountSettingActions, helperActions } from '../../../actions';
import { accountSettingSelectors, helperSelectors, authSelectors } from '../../../selectors';
import Spinner from '../../../components/LocalSpinner';
import UpgradePageGenerator from './UpgradePageGenerator';

class AccountUpgrade extends Component {
  componentDidMount() {
    const {currentUser, fetchStatesRequest, accountUpgradeRequiredRequest} = this.props;
    if(currentUser.country_id) {
      fetchStatesRequest(currentUser.country_id);
    }
    accountUpgradeRequiredRequest({upgrade_required: false});
  }

  render() {
    const {
      token,
      states,
      isLoading,
      pricePlans,
      currentUser,
      notification,
      dismissToaster,
      postAccountUpgradeRequest,
      setComponentLoadingRequest,
      fetchAccountUpgradePlansRequest
    } = this.props;

    return (
      <Spinner loaded={!isLoading}>
        <UpgradePageGenerator
          token={token}
          states={states}
          pricePlans={pricePlans}
          currentUser={currentUser}
          notification={notification}
          dismissToaster={dismissToaster}
          postAccountUpgradeRequest={postAccountUpgradeRequest}
          setComponentLoadingRequest={setComponentLoadingRequest}
          fetchAccountUpgradePlansRequest={fetchAccountUpgradePlansRequest}
        />
      </Spinner>
    );
  }
}

const mapStateToProps = (state) => {
  return createStructuredSelector({
    pricePlans: accountSettingSelectors.selectAccountSettingsPricePlans(),
    isLoading: helperSelectors.isLoadingSelector(),
    token: accountSettingSelectors.selectAccountSettingsUpgradeToken(),
    currentUser: authSelectors.selectCurrentUser(),
    states: accountSettingSelectors.selectAccountSettingsStates(),
    notification: helperSelectors.selectNotification()
  });
}

const mapDispatchToProps = {
  fetchAccountUpgradePlansRequest: accountSettingActions.fetchAccountUpgradePlansRequest,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
  postAccountUpgradeRequest: accountSettingActions.postAccountUpgradeRequest,
  fetchStatesRequest: accountSettingActions.fetchStatesRequest,
  accountUpgradeRequiredRequest: accountSettingActions.accountUpgradeRequiredRequest,
  dismissToaster: helperActions.dismissToaster,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountUpgrade);
