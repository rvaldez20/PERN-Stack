const {Pool} = require('pg');

const pool = new Pool({
   user: 'postgres',
   password: '6038987210',
   host: 'localhost',
   port: 5432,
   database: 'taskdb'
});

module.exports = pool;