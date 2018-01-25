import { fromJS } from 'immutable'

import {
	SET_CURRENT_MEMBER,
  MARK_AS_FAVORITE_REQUEST,
	UNMARK_AS_FAVORITE_REQUEST,
	LIKE_MEMBER_ACTIVITY_SUCCESS,
	UN_LIKE_MEMBER_ACTIVITY_SUCCESS,
	POST_COMMENT_ON_MEMBER_ACTIVITY_SUCCESS,
	SET_DEFAULT_SEARCH_PARAMS
} from '../actions/types';

import { success } from '../helper/async';

const initialState = fromJS({
	current_member: null,
	current_member_activities: null,
});

const activityIndexToUpdate = (state, action) => state.get('current_member_activities').findIndex(activity => activity.get('id') === action.activityId);

const deleteActivityLike = (state, action) => {
	const activities = state.get('current_member_activities').toJS();
	const activityIndex = activityIndexToUpdate(state, action);
	const newLikes = activities[String(activityIndex)]['likes'].filter(like => like.id !== action.likeId);

	return state.setIn(['current_member_activities', activityIndex, 'likes'], fromJS(newLikes));
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_MEMBER:
			return state
				.set('current_member', fromJS(action.profile))
				.set('current_member_activities', fromJS(action.activities));
		case success(MARK_AS_FAVORITE_REQUEST): 
			return state.mergeIn(['current_member'], fromJS({is_favorite: true }));
		case success(UNMARK_AS_FAVORITE_REQUEST): 
			return state.mergeIn(['current_member'], fromJS({is_favorite: false }));
		case LIKE_MEMBER_ACTIVITY_SUCCESS: 
			const likesKeyPath = ['current_member_activities', activityIndexToUpdate(state, action), 'likes'];
			return state.mergeIn(likesKeyPath, state.getIn(likesKeyPath).push(fromJS(action.activity_like)));
		case UN_LIKE_MEMBER_ACTIVITY_SUCCESS:
			return deleteActivityLike(state, action);
		case POST_COMMENT_ON_MEMBER_ACTIVITY_SUCCESS:
			const commentsKeyPath = ['current_member_activities', activityIndexToUpdate(state, action), 'comments'];
			return state.mergeIn(commentsKeyPath, state.getIn(commentsKeyPath).push(fromJS(action.activity_comment)));
		case SET_DEFAULT_SEARCH_PARAMS:
			return state.mergeIn(['default_search_params'], fromJS(action.params));
		default:
			return state;
	}
}
