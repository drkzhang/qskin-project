import React, { Component } from 'react'
import { Link } from 'react-router'

export default class UserProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      firstName: 'firstName',
      lastName: 'lastName',
      username: 'username',
      validFirstName: true,
      validLastName: true,
      validUsername: true,
    }
  }

  render() {
    if (!this.props.userSigninState.signedIn) {
      return (<div id="redirectSignin" className="user-form text-center">
        Haven't signed in yet? <Link to="/users/signin">Click to sign in.</Link>
      </div>)
    }

    return (<div>
      <form className="user-form text-center" id="userProfileForm" name="userProfileForm">
        <div>{this.state.errorMessage}</div>
        <div>
          <input className="form-control form-field-first"
            aria-label="firstname"
            placeholder="Provide a first name"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChangeFirstName.bind(this)}
            />
        </div>
        <div>
          <input className="form-control form-field-first"
            aria-label="lastname"
            placeholder="Provide a last name"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChangeLastName.bind(this)}
            />
        </div>
        <div>
          <input className="form-control form-field-first"
            aria-label="username"
            placeholder="Provide a new username"
            type="text"
            value={this.state.username}
            onChange={this.handleChangeUsername.bind(this)}
            />
        </div>
        <div>
          <button className="btn btn-primary btn-block" type="submit"
            disabled={!(this.state.validFirstName && this.state.validLastName && this.state.validUsername)} 
            >
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>)
  }
  
  handleChangeFirstName(event) {
    this.setState({
      firstName: event.target.value,
    })
    if (event.target.value.length === 0) {
      this.setState({
        errorMessage: 'First name is required',
        validFirstName: false,
      })
    } else {
      this.setState({
        errorMessage: '',
        validFirstName: true,
      })
    }
  }

  handleChangeLastName(event) {
    this.setState({
      lastName: event.target.value,
    })
    if (event.target.value.length === 0) {
      this.setState({
        errorMessage: 'Last name is required',
        validLastName: false,
      })
    } else {
      this.setState({
        errorMessage: '',
        validLastName: true,
      })
    }
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value,
    })
    if (event.target.value.length === 0) {
      this.setState({
        errorMessage: 'Username is required',
        validUsername: false,
      })
    } else {
      this.setState({
        errorMessage: '',
        validUsername: true,
      })
    }
  }
}