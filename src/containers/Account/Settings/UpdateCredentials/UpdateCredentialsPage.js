import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import NotificationSystem from "../../../../components/NotificationSystem";

class UpdateCredentialsPage extends Component {
  constructor(props) {
    super(props);
    const { user_name, password } = props.credentials;
    this.state = {
      credential: {
        user_name, password,
        password_confirmation: ''
      }
    }
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({
      credential: { ...this.state.credential, [name]: value }
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.updateUserCredentialsRequest({
      credentials: this.state.credential
    });
  };

  render() {
    const { credential } = this.state;
    const { notification, dismissToaster } = this.props;
    
    return (
      <div>
        <NotificationSystem
          notification={notification}
          dismissToaster={dismissToaster}
        />
        <form className="credentals__update__form" onSubmit={this.handleOnSubmit}>
          <h3>Account Information</h3>
          <div className="settings__fields">
            <div>
              <label>Username</label>
              <TextInput 
                name="user_name" 
                type="text" 
                placeholder="Username" 
                value={credential.user_name} 
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Password</label>
              <TextInput
                name="password"
                type="password"
                placeholder="Password"
                value={credential.password}
                onChange={this.handleOnChange}                
              />
            </div>
            <div>
              <label>Confirm Password</label>
               <TextInput
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={credential.password_confirmation}
                onChange={this.handleOnChange}
              />
            </div>
          </div>
          <Button type="submit" className="settings__update-button">
            Update Credentials
          </Button>
        </form>
      </div>
    );
  }
}

UpdateCredentialsPage.propTypes = {
  contact: PropTypes.object,
  notification: PropTypes.object
};

export default UpdateCredentialsPage;
