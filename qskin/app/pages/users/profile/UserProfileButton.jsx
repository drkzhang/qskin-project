import React, { Component } from 'react'
import { Link } from 'react-router'
import '../../../stylesheets/userProfileButton.scss'

export default class UserProfileButton extends Component {

	render() {
		if (this.props.userSigninState.signedIn) {
			return (<div className="profileButtonContainer">
				<div>
					{<Link to="/users/me">
						<button className="btn btn-primary" id="profileButton" type="button" >MY PROFILE</button>
					</Link>
					}
				</div>
			</div>)
		}
		return (<div></div>)
	}
}