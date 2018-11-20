import React, { Component } from 'react'
import Banner from './Banner'
import CreatePost from '../posts/CreatePost'
import PostsList from '../posts/PostsList'
import { connect } from 'react-redux'
import { uploadFiles, create } from '../../actions/postActions'
import { listposts } from '../../actions/postActions'

class HomePageContainer extends Component {

	componentWillMount() {
		this.props.dispatch(listposts())
	}
	render() {
		return (
			<div>
				<Banner />
				<div className="container">
					<CreatePost
						userSigninState={this.props.userSigninState}
						uploadFilesHandler={this.uploadFilesHandler.bind(this)}
						filesUploadState={this.props.filesUploadState}
						createPostHandler = {this.createPostHandler.bind(this)}
						postState = {this.props.postState}
					/>
					<PostsList
						userSigninState={this.props.userSigninState}
						listPostsState={this.props.listPostsState} />
				</div>
			</div>
		)
	}

	uploadFilesHandler(files) {
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
		listPostsState: state.listPostsState,
	}
}

export default connect(select)(HomePageContainer)