import chai from 'chai'
import chaiHttp from 'chai-http'
import config from '../../../app/config/config'

chai.should()
chai.use(chaiHttp)

describe ('get /', function() {

	before(function(){
		console.log('Starting indexControllers test suite.')
	})

	describe('happycase', function() {
		it('Response should be {\'hello world!\'}', function(done) {
			chai.request(config.baseUrl)
			.get(config.appUrl + "/")
			.end(function(err, res) {
				res.should.have.status(200)
				res.body.should.be.eql({response: 'hello world!'})
				done()
			})
		})
	})

	after(function() {
		console.log('indexControllers test suite completed.')
	})
})