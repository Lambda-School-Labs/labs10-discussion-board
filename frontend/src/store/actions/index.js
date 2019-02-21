import {
  // Actions
  //GET CATEGORIES
  GET_CATEGORIES_LOADING,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,

  //FOLLOW CATEGORY
  FOLLOW_CATEGORY_LOADING, 
  FOLLOW_CATEGORY_SUCCESS,
  FOLLOW_CATEGORY_FAILURE, 

  // Action Creators
  getCategories,
  followCategory,
} from './CategoriesActions.js';

import {
  // Actions
  //TOP DISCUSSIONS
  TOP_DISCUSSIONS_LOADING,
  TOP_DISCUSSIONS_SUCCESS,
  TOP_DISCUSSIONS_FAILURE,

  //GET DISCUSSIONS
  GET_DISCUSSIONS_LOADING,
  GET_DISCUSSIONS_SUCCESS,
  GET_DISCUSSIONS_FAILURE,

  GET_DISCUSSION_BY_ID_LOADING,
  GET_DISCUSSION_BY_ID_SUCCESS,
  GET_DISCUSSION_BY_ID_FAILURE,

		//FOLLOW DISCUSSIONS
		FOLLOW_DISCUSSION_LOADING,
		FOLLOW_DISCUSSION_SUCCESS,
    FOLLOW_DISCUSSION_FAILURE,
    
    //ADD DICUSSION
    ADD_DISCUSSION_LOADING, 
    ADD_DISCUSSION_SUCCESS, 
    ADD_DISCUSSION_FAILURE, 

  // Action Creators
		getTopDiscussions,
		getDiscussionsByCat,
		getDiscussionById,
    followDiscussion,
    addDiscussion,
} from './DiscussionsActions.js';

import {
  // Actions
  HANDLE_DISCUSSION_VOTE_LOADING,
  HANDLE_DISCUSSION_VOTE_SUCCESS,
  HANDLE_DISCUSSION_VOTE_FAILURE,
  // Action Creators
  handleDiscussionVote
} from './DiscussionVotesActions';

import {
  //Actions
  HANDLE_POST_VOTE_LOADING,
  HANDLE_POST_VOTE_SUCCESS,
  HANDLE_POST_VOTE_FAILURE,

  //Action Creators
  handlePostVote
} from './PostVotesActions';

import {
  // Actions
  ADD_POST_LOADING,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,

  EDIT_POST_LOADING,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,

  REMOVE_POST_LOADING,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,

  // Action Creators
  addPost,
  editPost,
  removePost
} from './PostsActions.js';

import {
  // Actions
  GET_PROFILES_LOADING,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAILURE,

  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  // Action Creators
  getProfiles,
  getProfile
} from './ProfilesActions.js';

import {
  // Actions
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

  USER_LOG_BACK_IN_LOADING,
  USER_LOG_BACK_IN_SUCCESS,
  USER_LOG_BACK_IN_FAILURE,

  USER_SIGNOUT_SUCCESS,

  USER_AUTH0_LOGIN_LOADING,
  USER_AUTH0_LOGIN_SUCCESS,
  USER_AUTH0_LOGIN_FAILURE,

  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,

  PASSWORD_UPDATE_LOADING,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILURE,

  UPLOAD_AVATAR_LOADING,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,

  UPLOAD_AVATAR_URL_LOADING,
  UPLOAD_AVATAR_URL_SUCCESS,
  UPLOAD_AVATAR_URL_FAILURE,

  DISPLAY_ERROR,

  DISPLAY_MESSAGE,

  USER_EXISTS_LOADING,
  USER_EXISTS_SUCCESS,
  USER_EXISTS_FAILURE,

  EMAIL_EXISTS_LOADING,
  EMAIL_EXISTS_SUCCESS,
  EMAIL_EXISTS_FAILURE,
  EMAIL_CONFIRM_LOADING,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILURE,
  UPDATE_EMAIL_LOADING,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,

  // Action Creators
  login,
  signout,
  logBackIn,
  auth0Login,
  register,
  updatePassword,
  displayError,
  displayMessage,
  uploadAvatar,
  uploadAvatarUrl,
  isUsernameTaken,
  isEmailTaken,
  confirmEmail,
  updateEmail,
} from './UsersActions.js';

//*************************************************************************************************
//*************************************************************************************************
//*************************************************************************************************
//*************************************************************************************************
//*************************************************************************************************

export {
	//Categories Actions
	GET_CATEGORIES_LOADING,
	GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  
  FOLLOW_CATEGORY_LOADING, 
  FOLLOW_CATEGORY_SUCCESS,
  FOLLOW_CATEGORY_FAILURE,

	// Discussion Actions
	GET_DISCUSSIONS_LOADING,
	GET_DISCUSSIONS_SUCCESS,
	GET_DISCUSSIONS_FAILURE,

	TOP_DISCUSSIONS_LOADING,
	TOP_DISCUSSIONS_SUCCESS,
	TOP_DISCUSSIONS_FAILURE,

	GET_DISCUSSION_BY_ID_LOADING,
	GET_DISCUSSION_BY_ID_SUCCESS,
	GET_DISCUSSION_BY_ID_FAILURE,

	FOLLOW_DISCUSSION_LOADING,
	FOLLOW_DISCUSSION_SUCCESS,
  FOLLOW_DISCUSSION_FAILURE,
  
  ADD_DISCUSSION_LOADING, 
  ADD_DISCUSSION_SUCCESS, 
  ADD_DISCUSSION_FAILURE, 

	// Discussion Vote Actions
	HANDLE_DISCUSSION_VOTE_LOADING,
	HANDLE_DISCUSSION_VOTE_SUCCESS,
  HANDLE_DISCUSSION_VOTE_FAILURE,
  
  //Post Vote Actions
  HANDLE_POST_VOTE_LOADING,
  HANDLE_POST_VOTE_SUCCESS,
  HANDLE_POST_VOTE_FAILURE,

	// Users Actions
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	
	USER_LOG_BACK_IN_LOADING,
	USER_LOG_BACK_IN_SUCCESS,
	USER_LOG_BACK_IN_FAILURE,

	USER_SIGNOUT_SUCCESS,

	USER_AUTH0_LOGIN_LOADING,
	USER_AUTH0_LOGIN_SUCCESS,
  USER_AUTH0_LOGIN_FAILURE,
  
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,

	PASSWORD_UPDATE_LOADING,
	PASSWORD_UPDATE_SUCCESS,
	PASSWORD_UPDATE_FAILURE,

	UPLOAD_AVATAR_LOADING,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE,

	UPLOAD_AVATAR_URL_LOADING,
	UPLOAD_AVATAR_URL_SUCCESS,
	UPLOAD_AVATAR_URL_FAILURE,

	DISPLAY_ERROR,
	DISPLAY_MESSAGE,

	// Profile Actions
	GET_PROFILES_LOADING,
	GET_PROFILES_SUCCESS,
	GET_PROFILES_FAILURE,

	GET_PROFILE_LOADING,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,

	// Posts Actions
	ADD_POST_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,

	EDIT_POST_LOADING,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAILURE,

	REMOVE_POST_LOADING,
	REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  
  USER_EXISTS_LOADING,
  USER_EXISTS_SUCCESS,
  USER_EXISTS_FAILURE,
  EMAIL_EXISTS_LOADING,
  EMAIL_EXISTS_SUCCESS,
  EMAIL_EXISTS_FAILURE,

  EMAIL_CONFIRM_LOADING,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILURE,

  UPDATE_EMAIL_LOADING,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,

	// Categories Action Creators
  getCategories,
  followCategory,

	// Discussion Action Creators
	getTopDiscussions,
	getDiscussionsByCat,
	getDiscussionById,
  followDiscussion,
  addDiscussion,

	// Discussion Vote Action Creators
  handleDiscussionVote,
  
  // Post Vote Action Creators
  handlePostVote,

	// Users Action Creators
	register,
	login,
	signout,
	logBackIn,
	auth0Login,
	updatePassword,
	displayError,
	displayMessage,
	uploadAvatar,
  uploadAvatarUrl,
  isUsernameTaken,
  isEmailTaken,
  confirmEmail,
  updateEmail,

	// Profile Action Creators
	getProfiles,
	getProfile,

	// Posts Action Creators
	addPost,
	editPost,
	removePost,
};
