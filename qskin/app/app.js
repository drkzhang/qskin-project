require('./stylesheets/vendor/bootstrap/css/bootstrap.min.v.3.3.5.css')
require('./stylesheets/app.scss')

import React from 'react'
import { render } from 'react-dom'
import { Route, Router, hashHistory, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import HomePageContainer from './pages/homepage/HomePageContainer'
import SignupContainer from './pages/users/signup/SignupContainer'
import SigninContainer from './pages/users/signin/SigninContainer'
import SignoutContainer from './pages/users/signout/SignoutContainer'
import ProfileContainer from './pages/users/profile/ProfileContainer'
import AppContainer from './pages/AppContainer'
import { env } from './config/config'
import PostsContainer from './pages/posts/PostsContainer'

let appHistory = null
if (env === 'dev') {
	appHistory = hashHistory
} else {
	appHistory = browserHistory
}
let store = createStore(reducer,
	compose(
		applyMiddleware(thunk)
	)
)

let routes = (<div className="app">
			<Provider store={store}>
				<Router history={appHistory}>
					<Route name="main" component={AppContainer}>
						<Route name="home" path="/" component={HomePageContainer}/>
						<Route name="home" path="users/signup" component={SignupContainer}/>
						<Route name="home" path="users/signin" component={SigninContainer}/>
						<Route name="home" path="users/signout" component={SignoutContainer}/>
						<Route name="home" path="users/me" component={ProfileContainer}/>
						<Route name="profile" path="/users/me" component={ProfileContainer}/>
						<Route name="posts" path="/posts/new" component={PostsContainer} />
					</Route>
				</Router>
			</Provider>
		</div>
)

render(routes, document.getElementById('root'))