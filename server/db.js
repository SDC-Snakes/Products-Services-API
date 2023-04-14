// const { Pool } = require('pg');
require('dotenv').config();
const pgp = require('pg-promise')();

const cn = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 30,
};

const db = pgp(cn);

module.exports = db;
