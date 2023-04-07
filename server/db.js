// const { Pool } = require('pg');
const pgp = require('pg-promise')();
// const path = require('path');
// const fs = require('fs');

const cn = {
  // host: 'localhost',
  port: 5432,
  database: 'products',
  // user: 'kylestevens',
  max: 30,
};

const db = pgp(cn);

// const schemaPath = path.join(__dirname, 'schema.sql');
// const schemaQuery = fs.readFileSync(schemaPath).toString();

// db
//   .query(schemaQuery)
//   .then((res) => console.log(res))
//   .catch((err) => {
//     console.log(err);
//     // throw new Error('Error creating tables', err);
//   });

module.exports = db;
