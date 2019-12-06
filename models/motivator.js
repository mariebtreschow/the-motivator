const GoogleSpreadsheet = require('google-spreadsheet');
const _ = require('lodash')

const doc = new GoogleSpreadsheet('1meF3tdlq0srvXW_Uuo68Vwqz8gQYARAs7wlIHur_7YQ');

function get () {
    return new Promise((resolve, reject) => {
        return doc.getRows(1, (err, rows) => {
          if (err) throw err;
            const motivations = _.map(rows, (row) => {
              return row.motivation
            });
            const item = motivations[Math.floor(Math.random()*motivations.length)];
            resolve(item)
        })
    })
}

module.exports = {
    get
}
