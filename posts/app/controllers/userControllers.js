import express from 'express'
import entities from '../entities'
import { USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from '../utils/cookieHelpers'

const router = express.Router()

router.post('/signup', function(req, res, next) {
	if (!req.body.email) {
		res.response = {result:false, exception: "Email is required but not given."}
		next()
	} else if (!req.body.password) {
		res.response = {result:false, exception: "Password is required but not given."}
		next()
	} else if (req.body.first_name === undefined || req.body.first_name === null) {
		res.response = {result:false, exception: "Email is required but not given."}
		next()
	} else if (!req.body.last_name) {
		res.response = {result:false, exception: "Last name is required but not given."}
		next()
	} else if (req.body.consented === null || req.body.consented === undefined) {
		res.response = {result:false, exception: "User consent is required but not given."}
		next()
	} else {
		const data = req.body
		entities.Users.signup(data.email, data.username, data.password, data.first_name, data.last_name, data.consented, data.middle_name)
		.then(function(result) {
			res.response = {result:true}
			next()
		}).catch(function(err) {
			next(err)
		})
	}
})

router.post('/signin', function(req, res, next) {
	if (!req.body.email) {
		res.response = {result:false, exception: "Email is required but not given."}
		next()
	} else if (!req.body.password) {
		res.response = {result:false, exception: "Password is required but not given."}
		next()
	} else {
		const data = req.body
		entities.Users.signin(data.email, data.password)
		.then(function(result) {
			res.response = {result:result.result, session_id: result.session_id, user_id: result.uuid}
			next()
		}).catch(function(err) {
			next(err)
		})
	}
})

router.post('/signout', function(req, res, next) {
	if (!req.body.email) {
		res.response = {result:false, exception: "Email is required but not given."}
		next()
	}
	if (req.body.email !== req.get(EMAIL_COOKIE)) {
		res.response = {result:false, exception: "Unexpected logout value."}
		next()
	} else {
		entities.Users.signout(req.body.email, req.get(USER_ID_COOKIE), req.get(SESSION_ID_COOKIE), req.body.logout_all)
		.then(function(result) {
			res.response = {result:true}
			next()
		}).catch(function(err) {
			next(err)
		})
	}
})

export default router