const Pool = require("pg").Pool;

const pool = new Pool({
    user : "postgres",
    password : "ngogiang190201",
    host : "localhost",
    port : "5432",
    database : "hekto"
})

module.exports = pool;