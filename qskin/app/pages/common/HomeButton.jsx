import React, { Component } from 'react'
import '../../stylesheets/homeButton.scss'
import { Link } from 'react-router'

export default class HomeButton extends Component {
	render() {
		return (<div className="homeLinkContainer">
			<Link to='/'>
				<button className="btn btn-primary" id="homeLink" type="button">HOME</button>
			</Link>
		</div>)
	}
}