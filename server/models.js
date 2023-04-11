/* eslint-disable max-len */
const db = require('./db');

module.exports.getList = (count, page) => {
  const productCount = count || 5;
  const productPage = (page - 1) * count || 0;
  const queryString = 'SELECT * FROM products LIMIT $1 OFFSET $2';
  return db.any(queryString, [productCount, productPage]);
};

module.exports.getProduct = (id) => {
  const queryString = 'SELECT p.*, json_agg(json_build_object($1, f.feature, $2, f.value)) AS features FROM products p JOIN features f on p.id = f.product_id WHERE p.id = $3 GROUP BY p.id';
  return db.any(queryString, ['feature', 'value', id]);
};

module.exports.getStyles = async (productId) => {
  // const queryString = 'SELECT
  const queryString = 'SELECT s.*, json_agg(json_build_object($1, p.thumbnail_url, $2, p.url)) AS photos, json_object_agg(sk.id, json_build_object($3, quantity, $4, size)) AS skus FROM styles s JOIN photos p on s.id = p.style_id JOIN skus sk on s.id = sk.style_id WHERE product_id = $5 GROUP BY s.id';

  // SELECT s.product_id, json_object_agg(s.*, 'photos', json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) 'skus', json_object_agg(sk.id, json_build_object('quantity', quantity, 'size', size))) AS results FROM styles s JOIN photos p on s.id = p.style_id JOIN skus sk on s.id = sk.style_id WHERE product_id = 1 GROUP BY s.id;'

  return db.any(queryString, ['thumbnail_url', 'url', 'quantity', 'size', productId]);
};

module.exports.getRelated = (productId) => {
  const queryString = 'SELECT array_agg(related_product_id) FROM related_products WHERE current_product_id = $1';
  return db.any(queryString, productId);
};
