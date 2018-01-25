import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Member from '../../components/Member';

import { messagesActions, notificationsActions } from '../../actions';
import { messagesSelectors } from '../../selectors';

import Conversation from './Conversation';


class MessageList extends Component {
	loadMessage(threadId, nextThread) {
		const { setActiveThread } = this.props
		this.props.fetchThreadMessages(threadId);
		setActiveThread([threadId, nextThread]);
		this.props.fetchCurrentUserNotificationsRequest();
	}

	componentDidMount() {
		const { threads, fetchThreadMessages, setActiveThread } = this.props

		const currentThread = threads[0]
		const nextThread = threads[1]
		fetchThreadMessages(currentThread.id)
		setActiveThread([currentThread.id, nextThread])
		this.props.fetchCurrentUserNotificationsRequest();
	}

	renderMessages() {
		const {
			threads, activeThread, favorites,
			convMobileMessages, convMobileCurrentThread, convMobileIsLoading, convMobileIsSending,
			convMobilePostMessageRequest, convMobileSetSendingMessage, convMobileDeleteMessageThreadRequest
		} = this.props;
		
		if (convMobileCurrentThread === undefined)
			return null;
		return threads.map((thread, index) => {
			const nextThread = threads.length-1 !== index ? threads[index+1].id: -1;
			const isFavorited = favorites.find(t => t.user_id === thread.partner.user_id);
			return (
				<div
					key={thread.id}
					onClick={(e) => {
						this.loadMessage(thread.id, nextThread)
					}}
					className={classnames("messages__list__item", {
						"new-message": thread.unread_count > 0,
						"active-message": activeThread[0] === thread.id,
						"active-thread": activeThread[1] === thread.id,
						"favorited": isFavorited
					})}
				>
					{(thread.unread_count > 0 || isFavorited)  && <i className="fa fa-star"></i>}
					<Member member={thread.partner} profileLink={false} />
          { thread.message_preview &&
            <p className="message-ellipses">
              {thread.message_preview.length > 70 ? thread.message_preview.substr(0, 67) + "..." : thread.message_preview}
            </p>
          }

					{
						(convMobileCurrentThread.id === thread.id) && 
							<Conversation
								postMessageRequest={convMobilePostMessageRequest}
								setSendingMessage={convMobileSetSendingMessage}
								deleteMessageThreadRequest={(id)=>convMobileDeleteMessageThreadRequest(id)}
								thread={thread}
								messages={convMobileMessages}
								isMobile={true}
								isSending={convMobileIsSending}
								isLoading={convMobileIsLoading}
							/>
					
					}
				</div>
			);
		});
	}

	render() {
		return (
			<div className="messages__list">
				{this.renderMessages()}
			</div>
		)
	}
}

MessageList.propTypes = {
	threads: PropTypes.array.isRequired,
	fetchThreadMessages: PropTypes.func.isRequired
};

const mapStateToProps = () => {
	return createStructuredSelector({
		activeThread: messagesSelectors.activeThreadSelector()
	})
}

const mapDispatchToProps = {
	setActiveThread: messagesActions.setActiveThread,
	fetchCurrentUserNotificationsRequest: notificationsActions.fetchCurrentUserNotificationsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
