import { assert } from 'chai';

const CompareTo = (a, b) => {
    return a >= b;

}

describe ('CompareTo()', function() {


	before(function(){
		console.log('Starting CompareTo test suite.')

	})

	describe('aGreaterThanb', function(){
		it("should return true if a is greater than b.", function() {
			assert.equal(true, CompareTo(3,2))
		})
    })
    
    describe('aEqualsTob', function(){
		it("should return true if a equals to b.", function() {
			assert.equal(true, CompareTo(2,2))
		})
    })
    
    describe('aLessThanb', function(){
		it("should return fals if a is less than b.", function() {
			assert.equal(false, CompareTo(1,2))
		})
	})
	
	after(function() {
		console.log('validationHelpers test suite completed.')
	})
})