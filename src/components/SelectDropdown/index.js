import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SelectDropdown extends Component {
	state = {
		placeholder: this.props.placeholder,
		value: '',
		active: false
	};

	handleDropdownOnClick() {
		const {active} = this.state;
		this.setState({active: !active});
	}

	handleSelectOption(option) {
		const { onSelectOption } = this.props

		this.setState({
			placeholder: option.label,
			value: option.value
		});

		onSelectOption(option.value);
	}

	render() {
		const { active, placeholder } = this.state;
		const { items, styles } = this.props;

		return (
			<div
				onClick={this.handleDropdownOnClick.bind(this)}
				className={classnames('dropdown-wrapper', {'active': active})}
			  style={styles}
			>
				<div className="dropdown__caret">
					<i className="ti-angle-down"></i>
				</div>
				<span className="dropdown__placeholder">{placeholder}</span>
				<ul className="dropdown__options">
					{
						items.map((item, i) => {
							return (
								<li
									key={i}
									onClick={() => this.handleSelectOption(item)}
								>
									{item.label}
								</li>
							);
						})
					}
				</ul>
			</div>
		);
	}
}

SelectDropdown.propTypes = {
	placeholder: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired
};

export default SelectDropdown;