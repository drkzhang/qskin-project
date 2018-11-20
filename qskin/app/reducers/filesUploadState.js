import { UPLOAD_FILES_SUCCESSFUL, UPLOAD_FILES_FAILED } from '../actions/postActions'

export default (state = {
	success: false,
	message: '',
	filepath: [],
}, action) => {
	switch (action.type) {
		case UPLOAD_FILES_SUCCESSFUL: {
			return Object.assign({}, state, {
				success: true,
				message: 'Files are uploaded.',
				filepath: action.filepath,
			})
		}
		case UPLOAD_FILES_FAILED: {
			return Object.assign({}, state, {
				success: false,
				message: 'Unable to upload files. Please try again later.',
			})
		}
		default:
			return state
	}
}