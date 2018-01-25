import {
	SET_CURRENT_MEMBER,
	FETCH_CURRENT_MEMBER_REQUEST,
	MARK_AS_FAVORITE_REQUEST,
	UNMARK_AS_FAVORITE_REQUEST,
	BLOCK_USER,
	REPORT_USER,
	LIKE_MEMBER_ACTIVITY_REQUEST,
	UN_LIKE_MEMBER_ACTIVITY_REQUEST,
	LIKE_MEMBER_ACTIVITY_SUCCESS,
	UN_LIKE_MEMBER_ACTIVITY_SUCCESS,
	POST_COMMENT_ON_MEMBER_ACTIVITY_REQUEST,
	POST_COMMENT_ON_MEMBER_ACTIVITY_SUCCESS,
	SEND_ICE_BREAKER,
	FETCH_DEFAULT_SEARCH_PARAMS_REQUEST,
  	SET_DEFAULT_SEARCH_PARAMS
} from './types';

/**
 * Generate an action that instructs the saga middleware to initiate a request to fetch
 * the profile data for the currently viewed member
 *
 * @param memberId
 */
export const fetchCurrentMemberRequest = (memberId) => ({type: FETCH_CURRENT_MEMBER_REQUEST, memberId});

/**
 * Generate an action that instructs the saga middleware to save the profile data of
 * the currently viewed member to the redux store
 *
 * @param profile
 * @param activities
 * @returns {{type, profile: *, activities: []}}
 */
export const setCurrentMember = (profile, activities) => {
	return {type: SET_CURRENT_MEMBER, profile, activities};
}

/**
 * Generate an action that instructs the saga middleware to initiate a server request
 * that marks the currently viewed member as a favorite for the currently logged in user
 *
 * @param memberId
 */
export const markAsFavoriteRequest = (memberId) => ({type: MARK_AS_FAVORITE_REQUEST, memberId});

/**
 * Generate an action that instructs the saga middleware to initiate a server request
 * that unmarks the currently viewed member as a favorite for the currently logged in user
 *
 * @param memberId
 */
export const unmarkAsFavoriteRequest = (memberId) => ({type: UNMARK_AS_FAVORITE_REQUEST, memberId});

export const blockUser = (memberId) => ({type: BLOCK_USER, memberId});
export const reportUser = (memberId, reason) => ({type: REPORT_USER, payload: { user_id: memberId, reason }});
export const sendIceBreaker = (member, icebreaker) => ({type: SEND_ICE_BREAKER, payload: {
	recipient_user_id: member.id,
	recipient_user_name: member.user_name,
	icebreaker
}});

export const likeMemberActivityRequest = (activityId) => ({type: LIKE_MEMBER_ACTIVITY_REQUEST, activityId});

export const unLikeMemberActivityRequest = (activityId, likeId) => ({type: UN_LIKE_MEMBER_ACTIVITY_REQUEST, activityId, likeId});

export const likeMemberActivitySuccess = (activityId, activity_like) => ({type: LIKE_MEMBER_ACTIVITY_SUCCESS, activityId, activity_like});

export const unLikeMemberActivitySuccess = (activityId, likeId) => ({type: UN_LIKE_MEMBER_ACTIVITY_SUCCESS, activityId, likeId});

export const postCommentOnMemberActivityRequest = (activityId, payload) => ({type: POST_COMMENT_ON_MEMBER_ACTIVITY_REQUEST, activityId, payload});

export const postCommentOnMemberActivitySuccess = (activityId, activity_comment) => ({type: POST_COMMENT_ON_MEMBER_ACTIVITY_SUCCESS, activityId, activity_comment});

export const fetchDefaultSearchParamsRequest = () => ({
  type: FETCH_DEFAULT_SEARCH_PARAMS_REQUEST
});

export const setDefaultSearchParams = (params) => ({
  type: SET_DEFAULT_SEARCH_PARAMS,
  params
});