import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { accountSettingSelectors, helperSelectors, authSelectors } from '../../../../selectors';
import { accountSettingActions, helperActions } from '../../../../actions';
import PaymentMethodPage from './PaymentMethodPage';
import LocalSpinner from '../../../../components/LocalSpinner';

class PaymentMethod extends Component {
  componentDidMount() {
    const {
      setComponentLoadingRequest,
      fetchAccountPaymentMethodRequest,
      token,
      profile
    } = this.props;
    if(!profile || !token) {
      setComponentLoadingRequest(true);
      fetchAccountPaymentMethodRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  handleOnSubmit = (nonce) => {
    const {pricePlans} = this.props;
    const {upgrade, selectedIndex}= this.state;
    const plan_id = pricePlans[selectedIndex].id;

    this.props.postAccountUpgradeRequest({
      upgrade: Object.assign({}, upgrade, {plan_id, braintree_payment_nonce: nonce})
    });
  }

  render() {
    const {
      profile,
      token,
      isLoading,
      notification,
      currentUser,
      dismissToaster,
      updateProfileRequest,
      updateAccountPaymentMethodRequest
    } = this.props;

    return (
      <LocalSpinner loaded={!isLoading}>
        <PaymentMethodPage
          profile={profile}
          token={token}
          notification={notification}
          currentUser={currentUser}
          dismissToaster={dismissToaster}
          onSubmit={this.handleOnSubmit}
          updateProfileRequest={updateProfileRequest}
          updateAccountPaymentMethodRequest={updateAccountPaymentMethodRequest}
        />
      </LocalSpinner>
    );
  }
}

PaymentMethod.propTypes = {
  profile: PropTypes.object,
  notificaton: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  fetchPaymentMethodRequest: PropTypes.func,
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
    currentUser: authSelectors.selectCurrentUser(),
    token: accountSettingSelectors.selectAccountSettingsUpgradeToken()
  });
};

const mapDispatchToProps = {
  fetchAccountPaymentMethodRequest: accountSettingActions.fetchAccountPaymentMethodRequest,
  updateAccountPaymentMethodRequest: accountSettingActions.updateAccountPaymentMethodRequest,
  updateProfileRequest: accountSettingActions.updateProfileRequest,
  dismissToaster: helperActions.dismissToaster,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
  postAccountUpgradeRequest: accountSettingActions.postAccountUpgradeRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
