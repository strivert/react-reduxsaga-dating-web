import React, { Component } from 'react';

import SelectDropdown from '../../../components/SelectDropdown';

class UpdateProfile extends Component {
	state = {
		updateValue: ''
	};

	onInput(e) {
		if (typeof e === 'string') {
			this.setState({updateValue: e});
		} else {
			this.setState({updateValue: e.target.value});
		}
	}

	handleProfileUpdate(e) {
		e.preventDefault();

		const { attribute, onSubmit } = this.props;
		let profile = {};
		profile[attribute] = this.state.updateValue;

		this.setState({updateValue: ''});
		onSubmit(profile);
	}

	determineProfileItemUIView(profileItem) {
		const { type, available_values: listValues } = profileItem;
		const { updateValue } = this.state

		switch (type) {
			case 'dropdown':
				const items = listValues.map(item => ({label: item.formatted_value, value: item.value}));

				return (
					<SelectDropdown
						name="profileItem"
						placeholder="Choose an option..."
						items={items}
						onSelectOption={this.onInput.bind(this)}
						styles={{width: '22rem', alignSelf: 'center'}}
					/>
				);
			case 'textfield':
				return (
					<input type="text"
					       onChange={this.onInput.bind(this)}
					       value={updateValue}
					/>
				);
			case 'textarea':
				return (
					<textarea
						value={updateValue}
						onChange={this.onInput.bind(this)}
					/>
				);
			default:
				return <div></div>;
		}
	}

	render() {
		const { profileItem } = this.props;

		if (profileItem) {
			return (
				<form onSubmit={ this.handleProfileUpdate.bind(this) }>
					{this.determineProfileItemUIView(profileItem)}
					<input type="submit"/>
				</form>
			);
		}

		return <div>Loading...</div>
	}
}

export default UpdateProfile;