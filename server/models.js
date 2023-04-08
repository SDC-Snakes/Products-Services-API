/* eslint-disable max-len */
const db = require('./db');

module.exports.getList = (count, page) => {
  const productCount = count || 5;
  const productPage = (page - 1) * count || 0;
  const queryString = 'SELECT * FROM products LIMIT $1 OFFSET $2';
  return db.any(queryString, [productCount, productPage]);
};

module.exports.getProduct = async (id) => {
  const queryString = 'SELECT p.*, json_agg(json_build_object($1, f.feature, $2, f.value)) AS features FROM products p JOIN features f on p.id = f.product_id WHERE p.id = $3 GROUP BY p.id';
  const response = await db.any(queryString, ['feature', 'value', id]);
  // response[0].features = await db.any('SELECT feature, value FROM features WHERE product_id = $1', id);
  return response;
};

module.exports.getStyles = async (productId) => {
  const queryString = 'SELECT s.*, json_agg(json_build_object($1, p.thumbnail_url, $2, p.url)) AS photos, json_object_agg(sk.id, json_build_object($3, quantity, $4, size)) AS skus FROM styles s JOIN photos p on s.id = p.style_id JOIN skus sk on s.id = sk.style_id WHERE product_id = $5 GROUP BY s.id';

  // SELECT json_build_object(s.*, json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) AS photos, json_object_agg(sk.id, json_build_object('quantity', quantity, 'size', size)) AS skus)) AS results FROM styles s JOIN photos p on s.id = p.style_id JOIN skus sk on s.id = sk.style_id WHERE product_id = 1 GROUP BY s.id'

  return db.any(queryString, ['thumbnail_url', 'url', 'quantity', 'size', productId]);


  // const queryString = 'SELECT * FROM styles WHERE product_id = $1';
  // const response = await db.any(queryString, productId);
  // const photosQuery = 'SELECT thumbnail_url, url FROM photos WHERE style_id = $1';
  // const photoPromises = response.map((style, index) => db.any(photosQuery, response[index].id)
  //   .then((photoData) => ({ ...style, photos: photoData }))
  //   .catch((err) => {
  //     throw new Error('Error getting photo data\n', err);
  //   }));
  // const styles = await Promise.all(photoPromises);
  // const skusQuery = 'SELECT json_object_agg(id, json_build_object($1, quantity, $2, size)) AS skus FROM skus WHERE style_id = $3;';
  // const skuPromises = styles.map((style, index) => db.any(skusQuery, ['quantity', 'size', styles[index].id])
  //   .then((skuData) => ({ ...style, skus: skuData[0].skus }))
  //   .catch((err) => {
  //     throw new Error('Error getting sku data\n', err);
  //   }));
  // return Promise.all(skuPromises);
};

module.exports.getRelated = (productId) => {
  const queryString = 'SELECT array_agg(related_product_id) FROM related_products WHERE current_product_id = $1';
  return db.any(queryString, productId);
};
