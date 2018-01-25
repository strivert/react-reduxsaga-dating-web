import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import MessageList from './MessageList'
import Conversation from './Conversation'
import LocalSpinner from '../../components/LocalSpinner';

import { messagesActions, helperActions } from '../../actions'
import { messagesSelectors, helperSelectors, viewersFavoriteSelectors } from '../../selectors';

class Messages extends Component {
	componentDidMount() {
		const { fetchMessageThreadsRequest } = this.props;
    	fetchMessageThreadsRequest();
	}

	render() {
		const {
			threads, messages,  activeThread, isSending, isLoading, favorites,
			fetchThreadMessagesRequest, postMessageRequest, setSendingMessage, deleteMessageThreadRequest
		} = this.props;

		if (!threads.find(t => t.id === activeThread[0]) && isLoading ) {
			return <LocalSpinner loaded={!isLoading} />
		}

		return (
			<div className="messages">
				{ threads.length > 0 &&
					<MessageList
						fetchThreadMessages={fetchThreadMessagesRequest}
						threads={threads}
						favorites={favorites}
						convMobilePostMessageRequest={postMessageRequest}
						convMobileSetSendingMessage={setSendingMessage}
						convMobileDeleteMessageThreadRequest={(id) => {
							deleteMessageThreadRequest(id);
						}}
						convMobileMessages={messages}
						convMobileCurrentThread={threads.find(t => t.id === activeThread[0])}
						convMobileIsLoading={isLoading}
						convMobileIsSending={isSending}
					/>
				}
				{ activeThread.length > 0 &&
					<Conversation
						postMessageRequest={postMessageRequest}
						setSendingMessage={setSendingMessage}
						deleteMessageThreadRequest={(id)=>{
							deleteMessageThreadRequest(id);
						}}
						thread={threads.find(t => t.id === activeThread[0])}
						isSending={isSending}
						messages={messages}
						isLoading={isLoading}
					/>
				}
				{ threads.length === 0 && 
					<div className="no-message">
            			You don't have any messages
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = () => {
	return createStructuredSelector({
		threads: messagesSelectors.currentUserMessageThreadsSelector(),
		messages: messagesSelectors.currentThreadMessagesSelector(),
		activeThread: messagesSelectors.activeThreadSelector(),
		isSending: messagesSelectors.isSendingMessageSelector(),
		isLoading: helperSelectors.isLoadingSelector(),
		favorites: viewersFavoriteSelectors.selectFavoriteProfiles()
	})
}

const mapDispatchToProps = {
	fetchMessageThreadsRequest: messagesActions.fetMessageThreadsRequest,
	fetchThreadMessagesRequest: messagesActions.fetchThreadMessagesRequest,
	postMessageRequest: messagesActions.postMessageRequest,
	setSendingMessage: messagesActions.setSendingMessage,
	deleteMessageThreadRequest: messagesActions.deleteMessageThreadRequest,
	setComponentLoadingRequest: helperActions.setComponentLoadingRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
