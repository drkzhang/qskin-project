import React, { Component } from 'react'
import UserProfileForm from './UserProfileForm'
import { connect } from 'react-redux'

class ProfileContainer extends Component {
  render() {
    return (<div>
      <UserProfileForm
        userSigninState = {this.props.userSigninState}
      />
    </div>)
  }
}

function select(state) {
  return {
    userSigninState: state.userSigninState,
  }
}

export default connect(select)(ProfileContainer)
