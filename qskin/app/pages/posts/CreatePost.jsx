import React, { Component } from 'react'
import picture from '../../assets/picture.png'
import send from '../../assets/send.png'
import '../../stylesheets/createPost.scss'
import { Link } from 'react-router'
import FormData from 'form-data'
import { readCookie, USER_ID_COOKIE } from '../../utils/cookieHelpers'


export default class CreatePost extends Component {

	constructor(props) {
		super(props)
		this.state = {
			title: '',
			content: '',
			userId: readCookie(USER_ID_COOKIE),
			errorMessage: '',
			validTitle: false,
			validContent: false,
			numberOfFiles: '',
		}
	}

	render() {
		if (this.props.userSigninState.signedIn === true) {
			return (<div className="createpostcontainer">
						<div>
							<input className="form-control form-field-first"
								placeholder="Enter the title..."
								type="text"
								id="post-title-input"
								onChange={this.handleChangeTitle.bind(this)}
							/>
						</div>
						<div>
							<input className="form-control form-field-first"
								placeholder="Enter the subject content..."
								type="textarea"
								id="post-content-input"
								onChange={this.handleChangeContent.bind(this)}
							/>
						</div>
						<div>
							<div id="end-page">
								<label className="btn" id="picture-button" >
									<input type="file"
										accept="image/jpg, image/png, image/jpeg"
										multiple
										onChange={this.handleChangeFiles.bind(this)}
									/>
									<img src={picture} className="add-picture-btn" />
									Add photos {this.state.numberOfFiles}
								</label>
								<button className="btn" id="send-post"
									disabled={!(this.state.validTitle && this.state.validContent)}
									onClick={this.handleClickSend.bind(this)} >
									<img src={send} className="send-btn" />
								</button>
							</div>
						</div>
					</div>)
		}
		return (
			<div>
				<center>
					<p>Please sign in first before creating post</p>
					<Link to='/users/signin'>Sign in here</Link>
				</center>
			</div>)
	}

	handleChangeFiles(event) {
		event.preventDefault()
		if (event.target.files.length !== 0 && event.target.files.length <= 9) {
			this.setState({
				numberOfFiles: `: ${event.target.files.length} selected`,
				errorMessage: '',
			})
			const files = new FormData()
			for (let i = 0; i < event.target.files.length; i++) {
				files.append("files", event.target.files[i])
			}
			this.props.uploadFilesHandler(files)
		}
		else if (event.target.files.length > 9) {
			this.setState({
				numberOfFiles: '',
				errorMessage: 'Select up to 9 photos only',
			})
		}
	}

	handleChangeTitle(event) {
		this.setState({
			title: event.target.value,
		})
		if (event.target.value.length === 0) {
			this.setState({
				errorMessage: 'Title is required',
				validTitle: false,
			})
		} else {
			this.setState({
				errorMessage: '',
				validTitle: true,
			})
		}
	}

	handleChangeContent(event) {
		this.setState({
			content: event.target.value,
		})
		if (event.target.value.length === 0) {
			this.setState({
				errorMessage: 'Content is required',
				validContent: false,
			})
		} else {
			this.setState({
				errorMessage: '',
				validContent: true,
			})
		}
	}

	handleClickSend(event) {
		event.preventDefault()
		let title = this.state.title
		let content = this.state.content
		let filepath = []
		let userId = this.state.userId
		if (this.state.numberOfFiles !== '' && this.props.filesUploadState.success) {
			filepath = this.props.filesUploadState.filepath
		}
		if(this.state.validTitle && this.state.validContent && userId) {
			this.props.createPostHandler(title, content, userId, filepath)
		}
	}
}