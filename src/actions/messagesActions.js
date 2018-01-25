import {
	FETCH_MESSAGE_THREADS_REQUEST,
	SET_MESSAGE_THREADS,
	FETCH_THREAD_MESSAGES_REQUEST,
	SET_THREAD_MESSAGES,
	SET_ACTIVE_THREAD,
	POST_MESSAGE_REQUEST,
	SET_POSTED_MESSAGE,
	SET_SENDING_MESSAGE,
	DELETE_MESSAGE_THREAD_REQUEST
} from './types';

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to fetch the list of message threads the currently logged in user is involved in
 */
export const fetMessageThreadsRequest = () => ({type: FETCH_MESSAGE_THREADS_REQUEST});

/**
 * Generate an action that instructs the saga middleware to save the currently
 * logged in user list of message threads
 */
export const setMessageThreads = (threads) => ({type: SET_MESSAGE_THREADS, threads});

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to fetch the list of messages for the given thread id
 */
export const fetchThreadMessagesRequest = (threadId) => ({type: FETCH_THREAD_MESSAGES_REQUEST, threadId});

/**
 * Generate an action that instructs the saga middleware to save the list of
 * messages for the currently viewed message thread
 */
export const setThreadMessages = (messages) => ({type: SET_THREAD_MESSAGES, messages});

/**
 * Generate an action that instructs the saga middleware to save the
 * active thread currently viewed by the user
 */
export const setActiveThread = (activeThread) => ({type: SET_ACTIVE_THREAD, activeThread});

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to send the given message
 */
export const postMessageRequest = (message) => ({type: POST_MESSAGE_REQUEST, message});

/**
 * Generate an action that instructs the saga middleware to save the given
 * message to the currently viewed thread list of messages
 */
export const setPostedMessage = (message) => ({type: SET_POSTED_MESSAGE, message});

/**
 * Generate an action that instructs the saga middleware to set a flag
 * indicating that a message is being sent to the server
 */
export const setSendingMessage = (status) => ({type: SET_SENDING_MESSAGE, status});

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to delete the messages for the given thread id
 */
export const deleteMessageThreadRequest = (threadId) => ({type: DELETE_MESSAGE_THREAD_REQUEST, threadId});
