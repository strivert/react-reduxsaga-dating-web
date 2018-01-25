import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Member from '../../../components/Member';

class NewMembers extends Component {
	renderNewMembers() {
		const {newMembers} = this.props

		if (newMembers) {
			return newMembers.map((member) => {
				return (
					<Member key={member.id} member={member} />
				);
			});
		}

		return (
			<div></div>
		);
	}

	render() {
		return (
			<div className="members">
				<div className="title">
					<h5>New CatholicSingles Members</h5>
				</div>
				{this.renderNewMembers()}
			</div>
		);
	}
}

NewMembers.propTypes = {
	newMembers: PropTypes.array
};

export default NewMembers;