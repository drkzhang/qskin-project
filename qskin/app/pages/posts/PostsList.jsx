import React, { Component } from 'react'
import Post from './Post'
import { deepEqual } from '../../utils/deepEqual.js'
import { postsApp } from '../../config/config.js';

export default class PostsList extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !deepEqual(nextProps.listPostsState.posts, this.props.listPostsState.posts)
	}

	render() {
		if (this.props.userSigninState.signedIn) {
			return (
				<div>
					{this.props.listPostsState.posts.map((post, index) => {
						for (let i = 0; i < post.photoUrls.length; i++) {
							post.photoUrls[i] = postsApp.baseUrl + post.photoUrls[i].substring(2)
						}
						
						return <Post
							key={index}
							title={post.title}
							content={post.content}
							userAvatar={''}
							userName={post.user.username}
							time={post.created_at}
							photos={post.photoUrls}
							likeCount={0}
							replyCount={0}
						/>
					})}
				</div>)
		}
		return (<div></div>)
	}
}
