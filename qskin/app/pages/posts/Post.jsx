import React, { Component } from 'react'
require ('../../stylesheets/post.scss')
import "../../stylesheets/imageSlide.scss"
import likeURL from '../../assets/icons/Like.png'
import commentURL from '../../assets/icons/Comment.png'
import bookmarkURL from '../../assets/icons/Bookmark.png'
import Slider from "react-slick"
import { Link } from 'react-router'

export default class Post extends Component {
	render() {
		const sliderSettings = {
			dots: false,
			lazyLoad: true,
			arrows: true,
			infinite: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			swipeToSlide: false,
		}

		return (<div className = "postcontainer col-sm-12">
					<div className = "titleLine">
						<h2 className= "col-sm-10"> {this.props.title} </h2>
						
						<div className="dropdown col-sm-2">
							<button className="dropbtn">...</button>
							<div className="dropdown-content">
							<Link>Notification about this post</Link>
							<Link>Hide this post</Link>
							<Link>Report this post</Link>
							</div>
						</div>
					</div>
					<div className="userTime col-sm-10"> {this.props.time} </div>
					<div className = "authorInfo col-sm-12">
						<img src={this.props.userAvatar} className="user-avatar" />
						<div className="userName"> {this.props.userName} </div>
					</div>
					<div className="content col-sm-12"> {this.props.content} </div>
					<div className="col-sm-12">
						{
							this.props.photos.length > 0 ? 
								<div className="sliderContainer">
									<Slider {...sliderSettings}>
										{this.props.photos.map(image => (
											<div key={image.toString()}>
												<img src={image} />
											</div>
										))}
									</Slider>
								</div>
							: null
						}
					</div>
					<div>
					<div className="col-sm-8"></div>
					<div className="interaction col-sm-4">
						<img src={bookmarkURL} className="reply-btn" />
						<img src={likeURL} className="like-btn" />
						<div className="info"> {this.props.likeCount} </div>
						<img src={commentURL} className="comment-btn" />
						<div className="info"> {this.props.replyCount} </div>
					</div></div>
				</div>)
	}
}