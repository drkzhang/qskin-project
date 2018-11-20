import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import HeaderContainer from './common/HeaderContainer'
import { checkSignin } from './../actions/userActions'

class AppContainer extends Component {

	componentWillMount() {
		this.props.dispatch(checkSignin())
	}

	render() {
		const pathname = this.props.location.pathname
		return (
			<div>
				<HeaderContainer/>
				<ReactCSSTransitionGroup
					transitionName="overall"
					transitionEnterTimeout={1000}
					transitionLeaveTimeout={100}
				>
					{React.cloneElement(this.props.children, {
						key: pathname,
					})}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

export default connect()(AppContainer)