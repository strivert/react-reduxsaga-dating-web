import React, { Component } from "react";
import { connect } from 'react-redux';
import { accountSettingActions } from '../../../actions';
import Button from '../../../components/Button';

class Reactivate extends Component {
  render() {
    const { updateUserReactivate } = this.props;
    return (
      <div className="reactivation_msg">
        <div className="settings">
          <p className="bold">
            Welcome back! We are glad to see you again!
          </p>
          <p>
            You previously cancelled your account and must re-activate it to continue.
          </p>
          <p>
            After reactivation your previous plan and plan terms will remain in effect.
          </p>
          <Button className="confirm" onClick={() => updateUserReactivate()}>
            Reactivate!
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateUserReactivate: accountSettingActions.updateUserReactivate
}

export default connect(null,  mapDispatchToProps)(Reactivate);
