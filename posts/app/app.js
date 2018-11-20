import express from 'express'
import path from 'path'
import logger from './utils/logger'
import cuid from 'cuid'
import bodyParser from 'body-parser'
import corsFilter from 'cors'
import fileUpload from 'express-fileupload'
import indexControllers from './controllers/indexControllers'
import continentControllers from './controllers/continentControllers'
import countryControllers from './controllers/countryControllers'
import userControllers from './controllers/userControllers'
import postControllers from './controllers/postControllers'
import fileControllers from './controllers/fileControllers'
import { isWhiteListRequest, isAuthenticated } from './security/authProvider'
import { USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from './utils/cookieHelpers'
import config from '../app/config/config'
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(corsFilter())
app.use(fileUpload())
app.options('*', corsFilter())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/posts/files', express.static(path.join(__dirname, '../files')))

app.use(function(req, res, next) {
	req.requestId = cuid()
	logger.info("request id: " + req.requestId + " request url: " + req.originalUrl)
	logger.info("request id: " + req.requestId + " request verb: " + req.method)
	logger.info("request id: " + req.requestId + " request headers: " + JSON.stringify(req.headers))
	next()
})

//security handler
app.use(function(req, res, next) {
	const isWhiteListed = isWhiteListRequest(req.originalUrl)
	if (isWhiteListed) {
		next()
	} else {
		const userId = req.get(USER_ID_COOKIE)
		const email = req.get(EMAIL_COOKIE)
		const sessionId = req.get(SESSION_ID_COOKIE)
		
		isAuthenticated(userId, email, sessionId)
		.then(function() {
			return next()
		}).catch(function(errr) {
			logger.error("request id: " + req.requestId + " error: " + errr)
			const err = new Error("Resource does not exist, or you do not have permission to access it.")
			err.status = 404
			return next(err)
		})
	}
})

router.use('/posts', postControllers)
router.use('/continents', continentControllers)
router.use('/countries', countryControllers)
router.use('/users', userControllers)
router.use('/files', fileControllers)
router.use('/', indexControllers)
app.use(config.appUrl, router)

app.use(function(req, res, next) {
		res.send(res.response)
		logger.info("request id: " + req.requestId + " response status: " + JSON.stringify(res.statusCode))
		logger.info("request id: " + req.requestId + " response headers: " + JSON.stringify(res.headers))
		logger.info("request id: " + req.requestId + " response body: " + JSON.stringify(res.response))
})

// error handlers
app.use(function(err, req, res, next) {
	logger.error("request id: " + req.requestId + " response headers: " + JSON.stringify(res.headers))
	if (err.status === 404) {
		res.status(404)
		logger.error("request id: " + req.requestId + " response status: 404")
		logger.error("request id: " + req.requestId + " response body: " + err)
		res.json({result: false, data:"Resource does not exist, or you do not have permission to access it."})
	} else if (err.status === 400) {
		res.status(400)
		logger.error("request id: " + req.requestId + " response status: 400")
		logger.error("request id: " + req.requestId + " response body: " + err)
		res.json({result: false, data:"Bad request."})
	} else {
		res.status(err.status || 500)
		logger.error("request id: " + req.requestId + " response status: 500")
		logger.error("request id: " + req.requestId + " response body: " + err)
		res.json({result: false, data:err.message})
	}
})

export default app