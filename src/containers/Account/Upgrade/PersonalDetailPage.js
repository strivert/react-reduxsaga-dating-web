import React from 'react';
import TextInput from '../../../components/TextInput';
import FormErrors from '../../../components/FormErrors';
import SelectBox from '../../../components/SelectBox';

const PersonalDetailPage = ({upgrade, states, errors, onChange, nextStep, prevStep, currentUser}) => {
    return (
      <div className="account__upgrade__personal__details">
        <h3>Personal Details</h3>
        {errors && <FormErrors formErrors={errors}/>}
        <div>
          <label>First Name</label>
          <TextInput
            name="first_name"
            type="text"
            placeholder="First Name"
            value={upgrade.first_name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <TextInput
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={upgrade.last_name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <TextInput
            name="address"
            type="text"
            placeholder="Address"
            value={upgrade.address}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Address 2</label>
          <TextInput
            name="address2"
            placeholder="Optional" 
            type="text"
            value={upgrade.address2}
            onChange={onChange}
          />
        </div>
        <div>
          <label>City</label>
          <TextInput
            name="city"
            type="text"
            placeholder="City"           
            value={upgrade.city}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <TextInput
            name="postal_code"
            type="text"
            placeholder="Postal Code"
            value={upgrade.postal_code}
            onChange={onChange}
          />
        </div>
        {currentUser.show_states && 
          <div>
            <label>State ID</label>
            <SelectBox
              name="state_id"
              type="text"
              placeholder="State ID"
              choices={states}
              value={upgrade.state_id}
              onChange={(val) => onChange({target: {name: 'state_id', value: val && val.value}})}
            />
          </div>
        }
        <div>
          <label>Phone</label>
          <TextInput
            name="phone"
            type="text"
            placeholder="Phone"
            value={upgrade.phone}
            onChange={onChange}
          />
        </div>
        <div className="acccount__upgrade__navigation">
          <button className="prev" onClick={prevStep}>Prev</button>
          <button className="next" onClick={nextStep}>Next</button>
        </div>
      </div>
    );
}

export default  PersonalDetailPage;