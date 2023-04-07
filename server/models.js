const db = require('./db');

module.exports.getList = (count, page) => {
  const productCount = count || 5;
  const productPage = (page - 1) * count || 0;
  const queryString = 'SELECT * FROM products LIMIT $1 OFFSET $2';
  return db.any(queryString, [productCount, productPage]);
};

module.exports.getProduct = async (id) => {
  const queryString = 'SELECT * FROM products WHERE id = $1';
  const response = await db.any(queryString, id);
  response[0].features = await db.any('SELECT feature, value FROM features WHERE product_id = $1', id);
  return response;
};

module.exports.getStyles = (productId) => {
  const queryString = 'SELECT * FROM styles WHERE product_id = $1';
  return db.any(queryString, productId);
};

module.exports.getRelated = (productId) => {
  const queryString = 'SELECT related_product_id FROM related_products WHERE current_product_id = $1';
  return db.any(queryString, productId);
};
