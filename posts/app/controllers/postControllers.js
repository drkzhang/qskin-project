import express from 'express'
import entities from '../entities'
import { readCookie, eraseCookie, USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from '../utils/cookieHelpers'

const router = express.Router()

router.post('/new', function(req, res, next){
    if (!req.body.title) {
		res.response = {result:false, exception: "Title is required but not given."}
		next()
	} else if (!req.body.content) {
		res.response = {result:false, exception: "Content is required but not given."}
		next()
	} else if (!req.body.user_id) {
		res.response = {result:false, exception: "User Id is required but not given."}
		next()
	} else if (req.body.user_id !== req.headers.user_id) {
		res.response = {result:false, exception: "Authentication failed."}
		next()
	} else {
        const data = req.body        
        entities.Users.find({ where: { uuid: req.body.user_id } })
        .then(function (user) {
            if (!user) {
                res.response = { result: false, exception: "User does not exist." }
                next()
            } else {
                entities.Posts.new(data.title.slice(0,100), data.content.slice(0,300), data.user_id, data.files)
                .then(function(result){ 
                    res.response = {result: true}
                    next()
                }).catch(function(error){
                    res.response = {result: false, exception: err.message}
                    next()
                })
            }    
        }).catch(function(err){
            res.response = {result: false, exception: err.message}
            next()
        })
	}
})

router.post('/reply', function (req, res, next) {
    if (!req.body.title) {
        res.response = { result: false, exception: "Title is required but not given." }
        next()
    } else if (!req.body.content) {
        res.response = { result: false, exception: "Content is required but not given." }
        next()
    } else if (!req.body.user_id) {
        res.response = { result: false, exception: "UserId is required but not given." }
        next()
    } else if (!req.body.parent_post_id) {
        res.response = { result: false, exception: "ParentPostId is required but not given." }
        next()
    } else if (req.body.title.length > 100) {
        res.response = { result: false, exception: "Incorrect title length." }
        next()
    } else if (req.body.content.length > 300) {
        res.response = { result: false, exception: "Incorrect content length" }
        next()
    } else {
        entities.Users.find({ where: { uuid: req.body.user_id } })
            .then(function (user) {
                if (!user) {
                    res.response = { result: false, exception: "user does not exist!" }
                    next()
                } else {
                    entities.Posts.find({ where: { uuid: req.body.parent_post_id } })
                        .then(function (post) {
                            if (!post) {
                                res.response = { result: false, exception: "parent post does not exist!" }
                                next()
                            }
                            else {
                                const data = req.body
                                entities.Posts.reply(data.title, data.content, data.user_id, data.parent_post_id)
                                    .then(function (result) {
                                        res.response = { result: true }
                                        next()
                                    }).catch(function (err) {
                                        next(err)
                                    })
                            }
                        }).catch(function (uErr) {
                            next(uErr)
                        })
                }

            }).catch(function (err) {
                next(err)
            })
    }}
)
router.get('/list', (req, res, next) => {
    entities.Posts.list()
    .then(posts => {
        if (!posts.length) {
            res.response = {}
            next()
        } else {
            res.response = {posts}
            next()
        }
    })
    .catch(err => {
        next(err)
    })
})

export default router