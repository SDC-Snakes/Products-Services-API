/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const db = require('./db');

const dataPath = path.join(__dirname, '../csv_data');
const schemaQuery = fs.readFileSync(path.join(__dirname, './schema.sql')).toString();
const loadQuery = fs.readFileSync(path.join(__dirname, './loadCSV.sql')).toString().replaceAll('$data_path', dataPath);

const setUpDB = async () => {
  await db.query(schemaQuery);
  await db.query(loadQuery);
};

setUpDB()
  .then(() => {
    console.log('Successful schema setup and csv load');
  })
  .catch((err) => {
    // console.log(err);
    throw new Error('Error creating schema and loading csv data\n', err);
  });

// db
//   .query(schemaQuery)
//   .then(() => {
//     db.query(loadQuery)
//       .then(() => console.log('Successful csv data load'))
//       .catch((err) => {
//         console.log(err);
//         throw new Error('Error loading csv data\n', err);
//       });
//       console.log('Successfully created schema'))
//   }
//   .catch((err) => {
//     console.log(err);
//     throw new Error('Error creating tables\n', err);
//   });
