import { createSelector } from 'reselect';

const selectMessageThreads = state => state.getIn(['messages', 'messageThreads']);
const selectThreadMessages = state => state.getIn(['messages', 'threadMessages']);
const selectActiveThread = state => state.getIn(['messages', 'activeThread']);
const selectIsSending = state => state.getIn(['messages', 'isSending']);

export const currentUserMessageThreadsSelector = () => createSelector(
	selectMessageThreads,
	threads => threads.toJS()
);

export const currentThreadMessagesSelector = () => createSelector(
	selectThreadMessages,
	messages => messages.toJS()
);

export const activeThreadSelector = () => createSelector(
	selectActiveThread,
	thread => thread.toJS()
);

export const isSendingMessageSelector = () => createSelector(
	selectIsSending,
	isSending => isSending
)