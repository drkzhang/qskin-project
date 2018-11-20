import React, { Component } from 'react'
import UserProfileButton from '../users/profile/UserProfileButton'
import { connect } from 'react-redux'
import HomeButton from './HomeButton';
import "../../stylesheets/headerContainer.scss"

class HeaderContainer extends Component {
	render() {
		return (<div className="container">
			<UserProfileButton userSigninState={this.props.userSigninState} />
			<HomeButton userSigninState={this.props.userSigninState} />
		</div>)
	}
}

function select(state) {
	return {
		userSigninState: state.userSigninState,
	}
}

export default connect(select)(HeaderContainer)