import express from 'express'
import uuid from 'uuid'
import path from 'path'


const router = express.Router()

router.post('/upload', function(req, res, next) {
	if (!req.files) {
		res.response = {result:false, exception: "Files are not given"}
		next()
	} else {
		const files = req.files.files
		const dest = './files/'
		let filepathArray = []
		const fileUploadPromises = []
		if (files.length > 1) {
			for (let i = 0; i < files.length; i++ ){
				files[i].name = `${uuid.v4()}${path.extname(files[i].name)}`
				files[i].mv(dest + files[i].name)
				fileUploadPromises.push(filepathArray.push(dest + files[i].name))
			}
			Promise.all(fileUploadPromises)
			.then(function (result) {
				res.response = { 
					result: true,
					filepath: filepathArray,
				}
				next()
			}).catch(function (err) {
				next(err)
			})
		} else {
			files.name = `${uuid.v4()}${path.extname(files.name)}`
			files.mv(dest + files.name)
			.then(function (result) {
				filepathArray.push(dest + files.name)
				res.response = { 
					result: true,
					filepath: filepathArray,
				}
				next()
			}).catch(function (err) {
				next(err)
			})
		}
	}
})

export default router