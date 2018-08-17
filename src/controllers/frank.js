const facts = require('../models/facts');
const error = require('../utils/createError');
const _ = require('lodash');

function createFrankFact(fact) {
    const errors = {}

    if (_.isObject(fact)){
        errors.body = 'request body must be an object'
    }
    
    if (!_.isEmpty(errors)){
        throw error.createError(400, 'There are some validation issues', errors);
    }
	try {
		return facts.create(fact)
	} catch (err) {
		Promise.reject(err);
	}
}

function getFrankFact() {
	try {
        return facts.get()
	} catch (err) {
		Promise.reject(err)
	}
}

module.exports = {
	getFrankFact,
    createFrankFact
}
