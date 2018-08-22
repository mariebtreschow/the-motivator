const GoogleSpreadsheet = require('google-spreadsheet');
const _ = require('lodash')

const doc = new GoogleSpreadsheet('1Fm16jiOYLe0KfbQA5WQmVYqSGuu5OuiOA66q3h09cHE');

function get () {
    return new Promise((resolve, reject) => {

        return doc.getRows(1, (err, rows) => {

            const facts = _.map(rows, (row) => {
                return row.fact
            })
            const item = facts[Math.floor(Math.random()*facts.length)];

            resolve(item)
        })

    })
}

module.exports = {
    get
}
