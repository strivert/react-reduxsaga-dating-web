import {
	FETCH_NEW_MEMBERS_REQUEST,
	SET_NEW_MEMBERS,
	FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST,
	SET_DASHBOARD_FEED_ACTIVITIES,
	FETCH_NEXT_INCOMPLETE_PROFILE_ITEM_REQUEST,
	SET_NEXT_INCOMPLETE_PROFILE_ITEM,
	UPDATE_PROFILE_ITEM_REQUEST,
	PROFILE_ITEM_UPDATE_SUCCESS,
	PROFILE_ITEM_UPDATE_ERROR,
  	FETCH_NOTIFICATIONS_REQUEST,
  	SET_NOTIFICATIONS,
	LIKE_ACTIVITY_REQUEST,
	UN_LIKE_ACTIVITY_REQUEST,
	LIKE_ACTIVITY_SUCCESS,
	UN_LIKE_ACTIVITY_SUCCESS,
	POST_COMMENT_REQUEST,
	POST_COMMENT_SUCCESS,
	RESET_MEMBERS_ACTIVITIES,
	FETCH_SINGLE_ACTIVITY_REQUEST,
	FETCH_SINGLE_ACTIVITY_SUCCESS,
	LIKE_SINGLE_ACTIVITY_REQUEST,
	UN_LIKE_SINGLE_ACTIVITY_REQUEST,
	LIKE_SINGLE_ACTIVITY_SUCCESS,
	UN_LIKE_SINGLE_ACTIVITY_SUCCESS,
	POST_SINGLE_COMMENT_REQUEST,
	POST_SINGLE_COMMENT_SUCCESS
} from './types';

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to fetch a list of members who recently signed up
 */
export const fetchNewMembersRequest = () => ({type: FETCH_NEW_MEMBERS_REQUEST});

/**
 * Generate an action that instructs the saga middleware to save the list
 * of members who recently signed up into the redux store
 */
export const setNewMembers = (members) => ({type: SET_NEW_MEMBERS, members});

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to fetch all members activities (paginated)
 */
export const fetchAllMembersActivities = (page, filter) => ({type: FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST, payload: {
	page: page || 1, filter: filter || 'all'
}});

export const resetMembersActivities = () => ({ type: RESET_MEMBERS_ACTIVITIES });
/**
 * Generate an action that instructs the saga middleware to save the list
 * of members activities into the redux store
 */
export const setDashboardFeedActivities = (activities) => ({type: SET_DASHBOARD_FEED_ACTIVITIES, activities});

/**
 * Generate an action that instructs the saga middleware to initiate aj action
 * to fetch the next incomplete profile item of the currently logged in user
 */
export const fetchNextProfileItemRequest = () => ({type: FETCH_NEXT_INCOMPLETE_PROFILE_ITEM_REQUEST});

/**
 * Generate an action that instructs the saga middleware to save the next
 * incomplete profile item to update for the currently logged in user
 */
export const setNextProfileItem = (profileItem) => ({type: SET_NEXT_INCOMPLETE_PROFILE_ITEM, profileItem})

/**
 * Generate an action that instructs the saga middleware to initiate aj action
 * to update the currently logged in user profile with the given payload
 *
 * @param profile
 */
export const updateProfileItemRequest = (profile) => ({type: UPDATE_PROFILE_ITEM_REQUEST, profile});

/**
 * Generate an action that instructs the saga middleware to save into
 * the redux store that current user's profile was updated successfully
 */
export const setProfileUpdatedSuccess = () => ({type: PROFILE_ITEM_UPDATE_SUCCESS})

/**
 * Generate an action that instructs the saga middleware to save into
 * the redux store that current user's profile failed to update
 */
export const setProfileUpdatedError = () => ({type: PROFILE_ITEM_UPDATE_ERROR})
/**
 * Generate an action that instructs the saga middleware to save into
 * the redux store the current notifications
 */
export const fetchNotificationsRequest = () => ({type: FETCH_NOTIFICATIONS_REQUEST})

/**
 * Generate an action that instructs the saga middleware to save the list
 * of notifications into the redux store
 */
export const setNotifications = (notifications) => ({type: SET_NOTIFICATIONS, notifications});


export const likeActivityRequest = (activityId) => ({type: LIKE_ACTIVITY_REQUEST, activityId});

export const unLikeActivityRequest = (activityId, likeId) => ({type: UN_LIKE_ACTIVITY_REQUEST, activityId, likeId});

export const likeActivitySuccess = (activityId, activity_like) => ({type: LIKE_ACTIVITY_SUCCESS, activityId, activity_like});

export const unLikeActivitySuccess = (activityId, likeId) => ({type: UN_LIKE_ACTIVITY_SUCCESS, activityId, likeId});

export const postCommentRequest = (activityId, payload) => ({type: POST_COMMENT_REQUEST, activityId, payload});

export const postCommentSuccess = (activityId, activity_comment) => ({type: POST_COMMENT_SUCCESS, activityId, activity_comment});

export const fetchSingleActivityRequest = (activityId) => ({type: FETCH_SINGLE_ACTIVITY_REQUEST, activityId});

export const fetchSingleActivitySuccess = (singleActivity) => ({type: FETCH_SINGLE_ACTIVITY_SUCCESS, singleActivity});

export const likeSingleActivityRequest = (activityId) => ({type: LIKE_SINGLE_ACTIVITY_REQUEST, activityId});

export const unLikeSingleActivityRequest = (activityId, likeId) => ({type: UN_LIKE_SINGLE_ACTIVITY_REQUEST, activityId, likeId});

export const likeSingleActivitySuccess = (activityId, activity_like) => ({type: LIKE_SINGLE_ACTIVITY_SUCCESS, activityId, activity_like});

export const unLikeSingleActivitySuccess = (activityId, likeId) => ({type: UN_LIKE_SINGLE_ACTIVITY_SUCCESS, activityId, likeId});

export const postSingleCommentRequest = (activityId, payload) => ({type: POST_SINGLE_COMMENT_REQUEST, activityId, payload});

export const postSingleCommentSuccess = (activityId, activity_comment) => ({type: POST_SINGLE_COMMENT_SUCCESS, activityId, activity_comment});
