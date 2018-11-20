import { combineReducers } from 'redux'
import userSigninState from './userSigninState'
import userSignupState from './userSignupState'
import postState from './postState'
import filesUploadState from './filesUploadState'
import listPostsState from './listPostsState'
export default combineReducers({
	userSigninState,
	userSignupState,
	postState,
	filesUploadState,
	listPostsState,
})