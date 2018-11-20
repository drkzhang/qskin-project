import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePost from './CreatePost'
import { uploadFiles, create } from '../../actions/postActions'

class PostsContainer extends Component {
	render() {
		return (
			<div>
				<CreatePost
					userSigninState = {this.props.userSigninState}
					uploadFilesHandler = {this.uploadFilesHandler.bind(this)}
					filesUploadState = {this.props.filesUploadState}
					createPostHandler = {this.createPostHandler.bind(this)}
					postState = {this.props.postState}
				/>
			</div>
		)
	}

	uploadFilesHandler(files){
		this.props.dispatch(uploadFiles(files))
	}

	createPostHandler(title, content, userId, filepath) {
		this.props.dispatch(create(title, content, userId, filepath))
	}
}

function select(state) {
	return {
		userSigninState: state.userSigninState,
		filesUploadState: state.filesUploadState,
		postState: state.postState,
	}
}

export default connect(select)(PostsContainer)