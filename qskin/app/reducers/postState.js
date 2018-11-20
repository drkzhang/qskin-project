import { CREATE_POST_SUCCESSFUL, CREATE_POST_FAILED } from '../actions/postActions'

export default (state = {
	success: false,
	message: '',
}, action) => {
	switch (action.type) {
		case CREATE_POST_SUCCESSFUL: {
			return Object.assign({}, state, {
				success: true,
				message: 'Post is created',
			})
		}
		case CREATE_POST_FAILED: {
			return Object.assign({}, state, {
				success: false,
				message: 'Unable to create the post. Please try again later.',
			})
		}
		default:
			return state
	}
}