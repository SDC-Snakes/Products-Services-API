const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'products',
  password: '',
  port: 3000,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const schemaPath = path.join(__dirname, 'schema.sql');
const schemaQuery = fs.readFileSync(schemaPath).toString();

pool
  .query(schemaQuery)
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
    // throw new Error('Error creating tables', err);
  });

module.exports = pool;
