import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import PaymentPage from './PaymentPage';
import AccountUpgradePage from './AccountUpgradePage';
import PersonalDetailPage from './PersonalDetailPage';

class UpgradePageGenerator extends Component {
  state = {
    selectedIndex: 0,
    page: 1,
    upgrade: {
      first_name: '',
      last_name: '',
      postal_code: '',
      city: '',
      state_id: '',
      address: '',
      address2: '',
      phone: ''
    },
    errors: null,
  }

  nextStep = () => {
    if(this.state.page === 2 && !this.isValid()) return;
    this.setState(({page}) => ({page: page + 1}));
  }

  prevStep = () => this.setState(({page, errors}) => ({page: page - 1, errors: null}));

  handleOnChange = ({target: {name, value}}) => {
    this.setState({upgrade: {...this.state.upgrade, [name]: value}})
  }

  onSelectPlan = (selectedIndex) => this.setState({selectedIndex});

  handleOnSubmit = (nonce) => {
    const {pricePlans} = this.props;
    const {upgrade, selectedIndex}= this.state;
    const plan_id = pricePlans[selectedIndex].id;

    this.props.postAccountUpgradeRequest({
      upgrade: Object.assign({}, upgrade, {plan_id, braintree_payment_nonce: nonce})
    });
  }

  isValid() {
    const errors = {};
    const {upgrade} = this.state;
    const {currentUser} = this.props;
    const exceptions = currentUser.show_states? ['address2']: ['address2', 'state_id'];

    Object.keys(upgrade).map(key => {
      if(!exceptions.includes(key) && !upgrade[key]) errors[key] = 'Required';
      return errors;
    });

    if(!isEmpty(errors)) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  renderPages() {
    const {page, errors, selectedIndex, upgrade} = this.state;
    const {
      token,
      states,
      pricePlans,
      currentUser,
      notification,
      dismissToaster,
      setComponentLoadingRequest,
      fetchAccountUpgradePlansRequest
    } = this.props;

    switch(page) {
      case 1:
        return <AccountUpgradePage
                selectedIndex={selectedIndex}
                nextStep={this.nextStep}
                onSelectPlan={this.onSelectPlan}
                pricePlans={pricePlans}
                setComponentLoadingRequest={setComponentLoadingRequest}
                fetchAccountUpgradePlansRequest={fetchAccountUpgradePlansRequest} />
      case 2:
        return <PersonalDetailPage
                errors={errors}
                states={states}
                upgrade={upgrade}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                currentUser={currentUser}
                onChange={this.handleOnChange} />
      case 3:
        return <PaymentPage
                token={token}
                prevStep={this.prevStep}
                notification={notification}
                dismissToaster={dismissToaster}
                onSubmit={this.handleOnSubmit} />
      default:
        return
    }
  }

  render() {
    return (
      <div>
        {this.renderPages()}
      </div>
    )
  }
}

UpgradePageGenerator.propTypes = {
  token: PropTypes.string,
  states: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string
  })),
  pricePlans: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    monthly_price_description: PropTypes.string.isRequired,
    length_membership_description: PropTypes.string.isRequired
  })),
  currentUser: PropTypes.shape({
    show_states: PropTypes.bool,
    show_zipcodes: PropTypes.bool,
    country_id: PropTypes.number
  }),
  notification: PropTypes.shape({
    toastType: PropTypes.string,
    message: PropTypes.string
  }),
  dismissToaster: PropTypes.func,
  setComponentLoadingRequest: PropTypes.func,
  fetchAccountUpgradePlansRequest: PropTypes.func.isRequired
}

export default UpgradePageGenerator;
