const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

async function create(newFrankFact) {
    const newFrankFact = await db.get('facts')
      .push(newFrankFact)
      .write()

    return newFrankFact
}

async function get() {
    const frankFact = await db.get('facts')
        .find({ title: 'frankFact is awesome' })
        .value()
    return frankFact

}

module.exports = {
	get,
    create
}
