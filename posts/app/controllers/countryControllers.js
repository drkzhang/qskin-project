import express from 'express'
import entities from '../entities'
import { isEmptyArray } from '../utils/validationHelpers'

const router = express.Router()

router.get('/:countryId', function(req, res, next) {
	entities.Countries.getById(req.params.countryId)
	.then(function(country) {
		if (!country) {
			res.response = {}
			next()
		} else {
			res.response = country
			next()
		}
	})
})

router.get('/:countryId/provinces', function(req, res, next) {
	entities.Countries.listAllProvinces(req.params.countryId)
	.then(function(countries) {
		if (isEmptyArray(countries)) {
			res.response = {}
			next()
		} else {
			res.response = countries
			next()
		}
	})
})

export default router