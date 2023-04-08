// const { Pool } = require('pg');
const pgp = require('pg-promise')();

const cn = {
  // host: 'localhost',
  port: 5432,
  database: 'products',
  // user: 'kylestevens',
  max: 30,
};

const db = pgp(cn);

module.exports = db;
