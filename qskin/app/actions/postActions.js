import axios from 'axios'
import { postsApp } from '../config/config'
import { postsAPI } from '../config/api'
import { readCookie, USER_ID_COOKIE } from '../utils/cookieHelpers'

export const CREATE_POST_SUCCESSFUL = 'CREATE_POST_SUCCESSFUL'
export const CREATE_POST_FAILED = 'CREATE_POST_FAILED'
export const UPLOAD_FILES_SUCCESSFUL = 'UPLOAD_FILES_SUCCESSFUL'
export const UPLOAD_FILES_FAILED = 'UPLOAD_FILES_FAILED'
export const LIST_POSTS_SUCCESSFUL = 'LIST_POSTS_SUCCESSFUL'
export const LIST_POSTS_FAILED = 'LIST_POSTS_FAILED'

export function create(title, content, userId, filepath) {
	return dispatch => {
		axios.post(postsApp.baseUrl + postsAPI.createPost,
			{
				title: title,
				content: content,
				user_id: userId,
				files: filepath,
			}, {
				headers: {user_id: readCookie(USER_ID_COOKIE)},
			})
			.then(function (res) {
				if (res && res.data && res.data.result) {
					dispatch(createSuccess())
					dispatch(listposts())
				}
			}).catch(function (err) {
				dispatch(createFail(err))
			})
	}
}

function createSuccess() {
	return {
		type: CREATE_POST_SUCCESSFUL,
	}
}

function createFail(error) {
	return {
		type: CREATE_POST_FAILED,
	}
}

export function uploadFiles(files) {
	return dispatch => {
		axios.post(postsApp.baseUrl + postsAPI.uploadPhotos, files)
			.then(function (res) {
				if (res && res.data && res.data.result) {
					dispatch(uploadSuccess(res.data.filepath))
				}
			}).catch(function (err) {
				dispatch(uploadFail(err))
			})
	}
}

function uploadSuccess(filepath) {
	return {
		type: UPLOAD_FILES_SUCCESSFUL,
		filepath: filepath,
	}
}

function uploadFail(error) {
	return {
		type: UPLOAD_FILES_FAILED,
	}
}

export function listposts() {
	return dispatch => {
		axios.get(postsApp.baseUrl + postsAPI.listposts)
			.then(function (res) {
				if (res && res.data) {
					dispatch(listSuccess(res.data.posts))
				}
			}).catch(function (err) {
				dispatch(listFail(err))
			})
	}
}

function listSuccess(posts) {
	return {
		type: LIST_POSTS_SUCCESSFUL,
		posts: posts,
	}
}

function listFail(error) {
	return {
		type: LIST_POSTS_FAILED,
	}
}