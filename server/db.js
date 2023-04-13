// const { Pool } = require('pg');
const pgp = require('pg-promise')();

const cn = {
  user: 'ubuntu',
  host: 'ec2-50-18-236-98.us-west-1.compute.amazonaws.com',
  database: 'products',
  password: 'ubuntu',
  port: 5432,
  max: 30,
};

const db = pgp(cn);

module.exports = db;
