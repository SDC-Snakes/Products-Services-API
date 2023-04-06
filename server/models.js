const db = require('./db');

module.exports.getProducts = () => {
  const queryString = 'SELECT * FROM products LIMIT 5';
  return db.any(queryString);
};
