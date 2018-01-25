import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../components/TextInput";
import SelectBox from "../../../../components/SelectBox";
import Button from "../../../../components/Button";
import NotificationSystem from '../../../../components/NotificationSystem';
import { extractFieldValues } from '../../../../utils';

class AccountInformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: props.contact,
      stateData: extractFieldValues(props.contact)
    };
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({
      contactData: { ...this.state.contactData, [name]: value }
    });
  };

  handleOnChangeState = ({value}) => {
    this.setState({stateData: {...this.state.stateData, 'state_id': value}})
  }

  toggleEmailNotification = ({ target: { name }}) => {
    this.setState({
      contactData: {...this.state.contactData, [name]: !this.state.contactData[name]}
    });
  }

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.updateContactInformationRequest({
      contact: Object.assign({}, this.state.contactData, {state_id: this.state.stateData.state_id})
    });
  };

  render() {
    const { contactData, stateData } = this.state;
    const { contact, notification, dismissToaster, currentUser } = this.props;

    if(!contact || !contactData) return null;
    
    return (
      <div>
        <NotificationSystem notification={notification} dismissToaster={dismissToaster} />
        <form className="account__information__form" onSubmit={this.handleOnSubmit}>
        <h3>Your Contact Information</h3>
          <div>
            <label>Email</label>
            <TextInput
              name="email"
              type="text"
              value={contactData.email}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="send_email_notifications"
              defaultChecked={contactData.send_email_notifications}
              onChange={this.toggleEmailNotification}
            />
            <label className="enable__notification">
              {" "}
              Yes, email me when I have unread messages on this site.
            </label>
            <p className="message__reminder">(External message reminders may take several hours)</p>
          </div>
          <div>
            <label>First Name</label>
            <TextInput
              name="first_name"
              type="text"
              value={contactData.first_name}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <TextInput
              name="last_name"
              type="text"
              value={contactData.last_name}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>Street Address</label>
            <TextInput
              name="street_address"
              type="text"
              value={contactData.street_address}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>Street Address 2</label>
            <TextInput
              name="street_address2"
              type="text"
              value={contactData.street_address2}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>City</label>
            <TextInput
              name="city_address"
              type="text"
              value={contactData.city_address}
              onChange={this.handleOnChange}
            />
          </div>
          {currentUser.show_states &&
            <div>
              <label>State/Province</label>
              <SelectBox
                name="state_id"
                choices={contact.state_id.available_values}
                value={stateData.state_id}
                onChange={this.handleOnChangeState}
                />
            </div>
          }
          <div>
            <label>Country</label>
            <TextInput
              name="country"
              type="text"
              readOnly
              defaultValue={contactData.country.name}
            />
          </div>
          <div>
            <label>Phone</label>
            <TextInput
              name="phone"
              type="text"
              value={contactData.phone}
              onChange={this.handleOnChange}
            />
          </div>
          {currentUser.show_zipcodes &&
            <div>
              <label>Zip</label>
              <TextInput
                name="zip"
                type="text"
                value={contactData.zip}
                onChange={this.handleOnChange}
              />
            </div>
          }
          <Button type="submit" className="settings__update-button">
            Update Contact Information
          </Button>
        </form>
      </div>
    );
  }
}

AccountInformationPage.propTypes = {
  contact: PropTypes.object,
  notification: PropTypes.object,
};

export default AccountInformationPage;
