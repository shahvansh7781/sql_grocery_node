const {createPool} = require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"root123",
    port:3306,
    database:"grocerystore"
})

module.exports = pool;