const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ facts: [
        {
            title: 'frankFact is awesome',
            description: 'too good to be true'
        }
    ]})
    .write()

async function create (newFrankFact) {
    const createFact = await db.get('facts')
        .push(newFrankFact)
        .write()
    return createFact
}

async function get () {
    const getFact = await db.get('facts')
        .find({ title: 'frankFact is awesome' })
        .value()
    return getFact
}

module.exports = {
	get,
    create
}
