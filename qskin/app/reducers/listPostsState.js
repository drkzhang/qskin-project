import { LIST_POSTS_SUCCESSFUL, LIST_POSTS_FAILED } from '../actions/postActions'
export default (state = {
	success: false,
	message: '',
	posts: [],
}, action) => {
	switch (action.type) {
		case LIST_POSTS_SUCCESSFUL: {
			return Object.assign({}, state, {
				success: true,
				message: 'Posts are listed',
				posts: action.posts,
			})
		}
		case LIST_POSTS_FAILED: {
			return Object.assign({}, state, {
				success: false,
				message: 'Failed to list posts',
			})
		}
		default:
			return state
	}
}