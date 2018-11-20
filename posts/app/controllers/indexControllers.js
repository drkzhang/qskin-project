import express from 'express'
const router = express.Router()

router.get('/', function(req, res, next) {
	res.response = {response: 'hello world!'}
	next()
})

export default router