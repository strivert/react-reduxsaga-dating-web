import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import Modal from '../../../components/Modal';
import SendMessage from '../../../components/ProfileMessage';
import SendReport from '../../../components/ProfileReport';
import FloatBox from '../../../components/FloatBox';
import IceBreakers from '../../../components/IceBreakers';

import { memberProfileActions } from '../../../actions'
import { asyncSelectors, messagesSelectors } from '../../../selectors/index';
import { MARK_AS_FAVORITE_REQUEST, UNMARK_AS_FAVORITE_REQUEST, BLOCK_USER } from '../../../actions/types';

class ProfileActions extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isMessageModalOpen: false,
			isMoreOptionOpen: false,
			isReportModalOpen: false,
		};
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.statuses[BLOCK_USER] === 'pending' && nextProps.statuses[BLOCK_USER] === 'success') {
			this.props.history.push('/account/block_user');
		}
		if (this.props.isSending && !nextProps.isSending) {
			this.setState({
				isMessageModalOpen: false
			})
		}
	}

	render() {
		const { markAsFavoriteRequest, unmarkAsFavoriteRequest, member, statuses, blockUser } = this.props;
		const { isMessageModalOpen, isMoreOptionOpen, isReportModalOpen } = this.state;

		return (
			<div className="profile__actions">
				<div className="actions__smile">
					<FloatBox
						arrow="left"
						actionBtn={
							<button className="round-btn">
								<i className="fa ti-face-smile"></i>
							</button>
						}
						customClass="icebreakers-wrapper"
					>
						<IceBreakers user={member} />
					</FloatBox>
				</div>
				<div className='actions__block__wrapper'>
					<FloatBox
						arrow="top"
						actionBtn={
							<button className="actions__block round-btn round-btn--ghost" onClick={() => {
								this.setState({ isMoreOptionOpen: !isMoreOptionOpen });
							}}>
								<i className="fa fa-ellipsis-v"></i>
							</button>
						}
						customClass="action-btns-group"
					>
						<div className="links-container">
							<div onClick={() => { this.setState({ isReportModalOpen: true })}} className="link">Report Member</div>
							<div onClick={() => { blockUser(member.id) }} className="link">Block Member</div>
						</div>
					</FloatBox>
				</div>
        { member.is_favorite ?
          <button
            onClick={() => unmarkAsFavoriteRequest(member.id)}
						className="actions__favorite btn btn--ghost actions__favorite__selected"
						disabled={statuses[UNMARK_AS_FAVORITE_REQUEST] === 'pending'}
          >
            <i className="ti-star"></i> Favorite
          </button>
          :
          <button
            onClick={() => markAsFavoriteRequest(member.id)}
						className="actions__favorite btn btn--ghost actions__favorite__unselected"
						disabled={statuses[MARK_AS_FAVORITE_REQUEST] === 'pending'}
          >
            <i className="ti-star"></i> Favorite
          </button>
        }
				<button
					onClick={() => this.setState({isMessageModalOpen: true})}
					className="actions__message btn"
				>
					<i className="fa ti-comment-alt"></i> <span>Message</span>
				</button>
				<Modal
					isOpen={isMessageModalOpen}
					onClose={() => this.setState({isMessageModalOpen: false})}
					bgColor="#F8FBFE"
				>
					<SendMessage to={member} />
				</Modal>
				<Modal
					isOpen={ isReportModalOpen }
					onClose={() => this.setState({isReportModalOpen: false})}
					bgColor="#F8FBFE"
				>
					<SendReport
						user={member}
						afterSubmit={() => {
							this.setState({isReportModalOpen: false, isMoreOptionOpen: false});
						}}
					/>
				</Modal>
			</div>
		);
	}
}

const mapDispatchToProps = {
	markAsFavoriteRequest: memberProfileActions.markAsFavoriteRequest,
	unmarkAsFavoriteRequest: memberProfileActions.unmarkAsFavoriteRequest,
	blockUser: memberProfileActions.blockUser,
};

const mapStateToProps = () => {
	return createStructuredSelector({
		statuses: asyncSelectors.statusesSelector(),
		isSending: messagesSelectors.isSendingMessageSelector()
	})
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileActions));
