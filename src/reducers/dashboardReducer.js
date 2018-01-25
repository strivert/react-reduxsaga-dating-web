import { fromJS } from 'immutable';

import {
	SET_NEW_MEMBERS,
	SET_DASHBOARD_FEED_ACTIVITIES,
	SET_NEXT_INCOMPLETE_PROFILE_ITEM,
	PROFILE_ITEM_UPDATE_SUCCESS,
  	PROFILE_ITEM_UPDATE_ERROR,
  	FETCH_NOTIFICATIONS_REQUEST,
	SET_NOTIFICATIONS,
	LIKE_ACTIVITY_SUCCESS,
	UN_LIKE_ACTIVITY_SUCCESS,
	POST_COMMENT_SUCCESS,
	RESET_MEMBERS_ACTIVITIES,
	FETCH_SINGLE_ACTIVITY_SUCCESS,
	LIKE_SINGLE_ACTIVITY_SUCCESS,
	UN_LIKE_SINGLE_ACTIVITY_SUCCESS,
	POST_SINGLE_COMMENT_SUCCESS
} from '../actions/types'

const initialState = fromJS({
	newMembers: fromJS([]),
	activities: fromJS([]),
	hasMoreActivities: false,
	profileItem: null,
	percentComplete: 0,
	profileUpdated: null,
	notifications: fromJS([]),
  	singleActivity: null
});

const activityIndexToUpdate = (state, action) => state.get('activities').findIndex(activity => activity.get('id') === action.activityId);

const deleteActivityLike = (state, action) => {
	const activities = state.get('activities').toJS();
	const indexOfActivity = activityIndexToUpdate(state, action);
	const newLikes = activities[String(indexOfActivity)]['likes'].filter(like => like.id !== action.likeId);

	return state.setIn(['activities', indexOfActivity, 'likes'], fromJS(newLikes));
}

export default (state=initialState, action) => {
	switch (action.type) {
		case SET_NEW_MEMBERS:
			return state.set('newMembers', fromJS(action.members));
		case SET_DASHBOARD_FEED_ACTIVITIES:
			const newState = state.update('activities', activities => activities.concat(fromJS(action.activities.activities)));
			return newState.set('hasMoreActivities', action.activities.meta.more_results);
		case RESET_MEMBERS_ACTIVITIES:
			return state.set('activities', fromJS([])).set('hasMoreActivities', false);
		case SET_NEXT_INCOMPLETE_PROFILE_ITEM:
			return state.merge({
				profileItem: fromJS(action.profileItem.profile),
				percentComplete: action.profileItem.meta.percent_complete
			});
		case PROFILE_ITEM_UPDATE_SUCCESS:
			return state.set('profileUpdated', 'success');
		case PROFILE_ITEM_UPDATE_ERROR:
			return state.set('profileUpdated', 'error');
    	case FETCH_NOTIFICATIONS_REQUEST:
      		return state.set('notifications', []);
    	case SET_NOTIFICATIONS:
			return state.set('notifications', fromJS(action.notifications.notifications));
		case LIKE_ACTIVITY_SUCCESS:
			const likesKeyPath = ['activities', activityIndexToUpdate(state, action), 'likes'];
			return state.mergeIn(likesKeyPath, state.getIn(likesKeyPath).push(fromJS(action.activity_like)));
		case UN_LIKE_ACTIVITY_SUCCESS:
			return deleteActivityLike(state, action);
		case POST_COMMENT_SUCCESS:
			const commentsKeyPath = ['activities', activityIndexToUpdate(state, action), 'comments'];
			return state.mergeIn(commentsKeyPath, state.getIn(commentsKeyPath).push(fromJS(action.activity_comment)));
		case FETCH_SINGLE_ACTIVITY_SUCCESS:
			return state.set('singleActivity', fromJS(action.singleActivity));
		case LIKE_SINGLE_ACTIVITY_SUCCESS:
			const singleLikesKeyPath = ['singleActivity', 'likes'];
			return state.mergeIn(singleLikesKeyPath, state.getIn(singleLikesKeyPath).push(fromJS(action.activity_like)));
		case UN_LIKE_SINGLE_ACTIVITY_SUCCESS:
			const singleActivity = state.get('singleActivity').toJS();
			const newSingleLikes = singleActivity['likes'].filter(like => like.id !== action.likeId);
			return state.setIn(['singleActivity', 'likes'], fromJS(newSingleLikes));
		case POST_SINGLE_COMMENT_SUCCESS:
			const singeCommentsKeyPath = ['singleActivity', 'comments'];
			return state.mergeIn(singeCommentsKeyPath, state.getIn(singeCommentsKeyPath).push(fromJS(action.activity_comment)));
		default:
			return state;
	}
}
