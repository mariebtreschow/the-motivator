const facts = require('../models/facts');
const error = require('../utils/createError');
const _ = require('lodash');

function createFrankFact(body) {
    const errors = {}
    const data = _.pick(body, ['title', 'description']);

    if (!_.isString(data.title) || !_.isString(data.description)){
        errors.message = 'title and description must be part of your frank fact'
    }
    if (!_.isEmpty(errors)){
        throw error.createError(400, 'There are some validation issues', errors);
    }
	try {
		return facts.create(data)
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
