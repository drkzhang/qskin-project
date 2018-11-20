import express from 'express'
import entities from '../entities'

const router = express.Router()

router.get('/list', function(req, res, next) {
	entities.Continents.list()
	.then(function(continents) {
		if (!continents.length) {
			res.response = {}
			next()
		} else {
			res.response = continents
			next()
		}
	})
})

router.get('/:continentId/countries', function(req, res, next) {
	entities.Continents.listAllCountries(req.params.continentId)
	.then(function(countries) {
		if (!countries.length) {
			res.response = {}
			next()
		} else {
			res.response = countries
			next()
		}
	})
})

export default router