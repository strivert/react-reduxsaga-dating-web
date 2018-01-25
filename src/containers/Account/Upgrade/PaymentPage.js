import React, { Component } from 'react';
import PropTypes from 'prop-types';
import braintree from 'braintree-web-drop-in';
import BraintreeDropin from 'braintree-dropin-react';
import NotificationSystem from '../../../components/NotificationSystem';

const renderSubmitButton = ({onClick, isDisabled, text}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
    >{text}</button>
  )
}

renderSubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

class PaymentPage extends Component {

  handlePaymentMethod = ({nonce}) => {
    this.props.onSubmit(nonce)
  }

  onCreate = (instance) => {
    console.log('onCreate')
  }

  onDestroyStart = () => {
    console.log('onDestroyStart')
  }

  onDestroyEnd = () => {
    console.log('onDestroyEnd')
  }

  onError = (error) => {
    console.log('onError', error)
  }
  
  render() {
    const {prevStep, token, notification, dismissToaster} = this.props;

    return (
      <div className="account__upgrade">
        <NotificationSystem notification={notification} dismissToaster={dismissToaster}/>
        <BraintreeDropin
          braintree={braintree}
          authorizationToken={token}
          handlePaymentMethod={this.handlePaymentMethod}
          onCreate={this.onCreate}
          onDestroyStart={this.onDestroyStart}
          onDestroyEnd={this.onDestroyEnd}
          onError={this.onError}
          renderSubmitButton={renderSubmitButton}
          submitButtonText="Upgrade"
          className="account__upgrade__payment"
          paypal={{
            flow: 'vault'
          }}
          card={{
            overrides: {
              fields: {
                number: {
                  placeholder: '1111 1111 1111 1111'
                }
              }
            }
          }}
        />
        <div className="account__upgrade__back__arrow" onClick={prevStep}><i className="fa ti-arrow-left"></i>Return to previous page</div>
      </div>
    );
  }
}

PaymentPage.propTypes = {
  prevStep: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  notification: PropTypes.shape({
    toastType: PropTypes.string,
    message: PropTypes.string
  }),
  dismissToaster: PropTypes.func
}

export default PaymentPage;
