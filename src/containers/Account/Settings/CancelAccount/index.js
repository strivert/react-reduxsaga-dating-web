/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector}  from 'reselect';
import SelectBox from '../../../../components/SelectBox';
import Button from '../../../../components/Button';
import { cancelReason } from '../../../../templates';
import { accountSettingActions, helperActions } from '../../../../actions';
import NotificationSystem from '../../../../components/NotificationSystem';
import { helperSelectors } from '../../../../selectors';

class CancelAccount extends Component {
  state = {
    reason: ''
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({...this.state, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.cancelAccountRequest({cancellation: {reason: this.state.reason}});
  };

  render() {
    const { notification, dismissToaster } = this.props;
    const { reason } = this.state;

    return (
      <div className="settings__cancel__account">
        <NotificationSystem notification={notification} dismissToaster={dismissToaster} />
        <h3>Are you sure you want to cancel?</h3>
        <p>
          Remember, we have more Catholics than anyone, and they can't find you
          if your account is closed!
        </p>
        <p>
          If you decide to cancel, please use the menu below and click on the
          YES button. To review our terms and conditions please <a href="#">click here.</a>
        </p>
        <p className="cancel__label">
          You can reactivate your account anytime. If you reactivate while your
          paid or free period is still in effect, you will not be billed until
          that calendar period has first expired.
        </p>
        <form className="cancel__form" onSubmit={this.handleSubmit}>
          <div>
            <label className="cancel__reason">Reason for canceling</label>
            <SelectBox
              name="reason"
              value={reason}
              choices={cancelReason}
              onChange={(val) => this.handleOnChange({target: {name: 'reason', value: val && val && val.value }})}
            />
          </div>
          <div className="cancel__account__buttons">
            <Link to="/account">
              <Button className="cancel">No, don't cancel my account</Button>
            </Link>
            <Button className="confirm" type="submit">Yes, Cancel my account</Button>
          </div>
        </form>
      </div>
    );
  }
}

CancelAccount.propTypes = {
  notification: PropTypes.shape({
    toastType: PropTypes.string,
    message: PropTypes.string,
  }),
  cancelAccountRequest: PropTypes.func,
  dismissToaster: PropTypes.func,
};

const mapStateToProps = (state) => {
  return createStructuredSelector({
    notification: helperSelectors.selectNotification()
  });
}

const mapDispatchToProp  = {
  cancelAccountRequest: accountSettingActions.cancelAccountRequest,
  dismissToaster: helperActions.dismissToaster
}

export default connect(mapStateToProps, mapDispatchToProp)(CancelAccount);
