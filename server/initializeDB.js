const fs = require('fs');
const path = require('path');
const db = require('./db');

const dataPath = path.join(__dirname, '../csv_data');
const schemaQuery = fs.readFileSync(path.join(__dirname, './schema.sql')).toString();
const loadQuery = fs.readFileSync(path.join(__dirname, './loadCSV.sql')).toString().replaceAll('data_path', dataPath);

db
  .query(schemaQuery)
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
    throw new Error('Error creating tables', err);
  });

db
  .query(loadQuery)
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
    throw new Error('Error creating tables', err);
  });
