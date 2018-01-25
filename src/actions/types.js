// Current Member Profile types
export const FETCH_CURRENT_MEMBER_REQUEST = 'fetch_current_member_request';
export const SET_CURRENT_MEMBER = 'set_current_member';
export const LIKE_MEMBER_ACTIVITY_REQUEST = 'like_member_activity_request';
export const UN_LIKE_MEMBER_ACTIVITY_REQUEST = 'un_like_member_activity_request';
export const LIKE_MEMBER_ACTIVITY_SUCCESS = 'like_member_activity_success';
export const UN_LIKE_MEMBER_ACTIVITY_SUCCESS = 'un_like_member_activity_success'
export const POST_COMMENT_ON_MEMBER_ACTIVITY_REQUEST = 'post_comment_on_member_activity_request';
export const POST_COMMENT_ON_MEMBER_ACTIVITY_SUCCESS = 'post_comment_on_member_activity_success';

export const BLOCK_USER = 'member_profile_block_user';
export const REPORT_USER = 'member_profile_report_user';
export const SEND_ICE_BREAKER = 'send_ice_breaker';

// Activities types
export const SET_CURRENT_MEMBER_ACTIVITIES = 'fetch_current_member_activities';
export const FETCH_CURRENT_MEMBER_ACTIVITIES_REQUEST = 'fetch_current_member_activities_request';

// Profile Actions types
export const MARK_AS_FAVORITE_REQUEST = 'marque_as_favorite_request';
export const UNMARK_AS_FAVORITE_REQUEST = 'unmarque_as_favorite_request';

// Dashboard types
export const FETCH_NEW_MEMBERS_REQUEST = 'fetch_new_members_request';
export const SET_NEW_MEMBERS = 'set_new_members';
export const FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST = 'fetch_all_users_activities_request';
export const SET_DASHBOARD_FEED_ACTIVITIES = 'set_dashboard_feed_activities';
export const FETCH_NEXT_INCOMPLETE_PROFILE_ITEM_REQUEST = 'fetch_next_incomplete_profile_item_request';
export const SET_NEXT_INCOMPLETE_PROFILE_ITEM = 'set_next_incomplete_profile_item';
export const UPDATE_PROFILE_ITEM_REQUEST = 'save_profile_item_request';
export const PROFILE_ITEM_UPDATE_SUCCESS = 'profile_item_update_success';
export const PROFILE_ITEM_UPDATE_ERROR = 'profile_item_update_error';
export const FETCH_NOTIFICATIONS_REQUEST = 'fetch_notifications_request';
export const SET_NOTIFICATIONS = 'set_notifications';
export const LIKE_ACTIVITY_REQUEST = 'like_activity_request';
export const LIKE_ACTIVITY_SUCCESS = 'like_activity_success';
export const UN_LIKE_ACTIVITY_REQUEST = 'un_like_activity_request';
export const UN_LIKE_ACTIVITY_SUCCESS = 'un_like_activity_success';
export const POST_COMMENT_REQUEST = 'post_comment_request';
export const POST_COMMENT_SUCCESS = 'post_comment_success';
export const RESET_MEMBERS_ACTIVITIES = 'reset_members_activities';

export const FETCH_SINGLE_ACTIVITY_REQUEST = 'fetch_single_activity_request';
export const FETCH_SINGLE_ACTIVITY_SUCCESS = 'fetch_single_activity_success';
export const LIKE_SINGLE_ACTIVITY_REQUEST = 'like_single_activity_request';
export const LIKE_SINGLE_ACTIVITY_SUCCESS = 'like_single_activity_success';
export const UN_LIKE_SINGLE_ACTIVITY_REQUEST = 'un_like_single_activity_request';
export const UN_LIKE_SINGLE_ACTIVITY_SUCCESS = 'un_like_single_activity_success';
export const POST_SINGLE_COMMENT_REQUEST = 'post_single_comment_request';
export const POST_SINGLE_COMMENT_SUCCESS = 'post_single_comment_success';

// Messages types
export const FETCH_MESSAGE_THREADS_REQUEST = 'fetch_message_threads_request';
export const SET_MESSAGE_THREADS = 'set_message_threads';
export const FETCH_THREAD_MESSAGES_REQUEST = 'fetch_thread_messages_request';
export const SET_THREAD_MESSAGES = 'set_thread_messages';
export const SET_ACTIVE_THREAD = 'set_active_thread';
export const POST_MESSAGE_REQUEST = 'post_message_request';
export const SET_POSTED_MESSAGE = 'set_posted_message';
export const SET_SENDING_MESSAGE = 'set_sending_message';
export const DELETE_MESSAGE_THREAD_REQUEST = 'delete_message_thread_request';

// Notifications types
export const FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST = 'fetch_current_user_notifications_request';
export const SET_CURRENT_USER_NOTIFICATIONS = 'set_current_user_notifications';

// Helper types
export const SET_COMPONENT_LOADING = 'set_component_loading';
export const SET_COMPONENT_LOADING_REQUEST = 'set_component_loading_request';
export const DISMISS_TOASTER = 'dismiss_toaster';
export const SET_TOAST = 'set_toast';

// Authentication Types
export const LOGIN_REQUEST = 'login_request';
export const LOGIN_SUCCESS = 'login_success';
export const LOGOUT_SUCCESS = 'logout_success'
export const AUTH_USER = 'auth_user';
export const LOGOUT_REQUEST = 'logout_request';

// account settings types
export const FETCH_ACCOUNT_PROFILE_REQUEST = 'fetch_account_profile_request';
export const FETCH_ACCOUNT_PROFILE_SUCCESS = 'fetch_account_profile_success';

export const UPDATE_ACCOUNT_PROFILE_REQUEST = 'update_account_profile_request';
export const UPDATE_ACCOUNT_PROFILE_SUCCESS = 'update_account_profile_success';

export const FETCH_CONTACT_INFORMATION_REQUEST = 'fetch_contact_information_request';
export const FETCH_CONTACT_INFORMATION_SUCCESS = 'fetch_contact_information_success';

export const UPDATE_CONTACT_INFORMATION_REQUEST = 'update_contact_information_request';
export const UPDATE_CONTACT_INFORMATION_SUCCESS = 'update_contact_information_success';

export const CANCEL_ACCOUNT_REQUEST = 'cancel_acccount_request';

export const FETCH_BLOCKED_USERS_REQUEST = 'fetch_blocked_users_request';
export const FETCH_BLOCKED_USERS_SUCCESS = 'fetch_blocked_users_success';
export const BLOCK_USER_REQUEST = 'block_user_request';
export const UN_BLOCK_USER_REQUEST = 'un_block_user_request';

export const FETCH_USER_CREDENTIALS_REQUEST = 'fetch_user_credentials_request';
export const FETCH_USER_CREDENTIALS_SUCCESS = 'fetch_user_credentials_success';

export const UPDATE_USER_CREDENTIALS_REQUEST = 'update_user_credentials_request';
export const UPDATE_USER_CREDENTIALS_SUCCESS = 'update_user_credentials_success';

export const FETCH_PERSONALITY_TEST_QUESTION_REQUEST = 'fetch_personality_test_question_request';
export const FETCH_PERSONALITY_TEST_QUESTION_SUCCESS = 'fetch_personality_test_question_success';
export const FETCH_PERSONALITY_TEST_RESULT_SUCCESS = 'fetch_presonality_test_result_success';
export const SUBMIT_PERSONALITY_TEST_REQUEST = 'submit_personality_test_request';

export const UPLOAD_PROFILE_PICTURE_REQUEST = 'upload_profile_picture_request';
export const FETCH_PROFILE_PICTURES_REQUEST = 'fetch_profile_pictures_request';
export const SET_PROFILE_PICTURES = 'set_profile_pictures';

export const FETCH_ACCOUNT_UPGRADE_PLANS_REQUEST = 'fetch_account_upgrade_plans_request';
export const FETCH_ACCOUNT_UPGRADE_PLANS_SUCCESS = 'fetch_account_upgrade_plans_success';
export const FETCH_ACCOUNT_UPGRADE_TOKEN_SUCCESS = 'fetch_account_upgrade_token_success';
export const POST_ACCOUNT_UPGRADE_REQUEST = 'post_account_upgrade_request';
export const POST_ACCOUNT_UPGRADE_SUCCESS = 'post_account_upgrade_success';

export const FETCH_ACCOUNT_PAYMENT_METHOD_REQUEST = 'fetch_account_payment_method_request';
export const FETCH_ACCOUNT_PAYMENT_METHOD_SUCCESS = 'fetch_account_payment_method_success';
export const UPDATE_ACCOUNT_PAYMENT_METHOD_REQUEST = 'update_account_payment_method_request';
export const UPDATE_ACCOUNT_PAYMENT_METHOD_SUCCESS = 'update_account_payment_method_success';

export const ACCOUNT_INACTIVE = 'account_inactive';
export const ACCOUNT_REACTIVATE = 'account_reactive';
export const ACCOUNT_REACTIVATE_SUCCESS = 'account_reactive_success';

export const ACCOUNT_UPGRADE_REQUIRED_REQUEST = 'account_upgrade_required_request';

export const FETCH_STATES_REQUEST = 'fetch_states_request';
export const FETCH_STATES_SUCCESS = 'fetch_states_success';

// Profiles types
export const TOGGLE_GALLERY = 'toggle_gallery';
export const FETCH_PROFILES_REQUEST = 'fetch_profiles_request';
export const FETCH_PROFILES_SUCCESS = 'fetch_profiles_success';
export const FETCH_PROFILES_FAILURE = 'fetch_profiles_failure';

export const SEARCH_PROFILES_REQUEST = 'search_profiles_request';
export const SEARCH_PROFILES_SUCCESS = 'search_profiles_success';
export const SEARCH_PROFILES_FAILURE = 'search_profiles_failure';

export const FETCH_DEFAULT_SEARCH_PARAMS_REQUEST = 'fetch_default_search_params_request';
export const SET_DEFAULT_SEARCH_PARAMS = 'set_default_search_params';
export const SET_PROFILES_EMPTY = 'set_profiles_empty';

// favorite/viewers TYPES
export const FETCH_FAVORITE_VIEWER_REQUEST = 'fetch_favorite_viewer_request';
export const FETCH_FAVORITE_PROFILES_SUCCESS = 'fetch_favorite_profiles_success';
export const FETCH_VIEWER_PROFILES_SUCCESS = 'fetch_viewer_profiles_success';
export const FETCH_FAVORITE_VIEWER_COMPLETE = 'fetch_favorite_viewer_complete';

export const DELETE_FAVORITE_PROFILE_REQUEST = 'delete_favorite_profile_request';
export const DELETE_FAVORITE_PROFILE_SUCCESS = 'delete_favorite_profile_success';

export const DELETE_FAVORITE_REQUEST = 'delete_favorite_request';
export const DELETE_FAVORITE_SUCCESS = 'delete_favorite_success';
export const DELETE_FAVORITE_FAILURE = 'delete_favorite_failure';

// Apologetics
export const SET_APOLOGETICS = 'set_apologetics';
export const FETCH_APOLOGETICS_REQUEST = 'fetch_apologetics_request';

// Async
export const STATUS = 'async_status'
export const ERROR = 'async_error'
export const RESET = 'async_reset'
