/* eslint-disable max-len */
const db = require('./db');

module.exports.getList = (count, page) => {
  const productCount = count || 5;
  const productPage = (page - 1) * productCount || 0;
  const queryString = 'SELECT * FROM products LIMIT $1 OFFSET $2';
  return db.any(queryString, [productCount, productPage]);
};

module.exports.getProduct = (id) => {
  const queryString = 'SELECT p.*, json_agg(json_build_object($1, f.feature, $2, f.value)) AS features FROM products p JOIN features f on p.id = f.product_id WHERE p.id = $3 GROUP BY p.id';
  return db.any(queryString, ['feature', 'value', id]);
};

module.exports.getStyles = async (productId) => {
  const queryString = `
    SELECT
      s.product_id,
      json_agg(
        json_build_object(
          $1, s.id,
          $2, s.name,
          $3, s.original_price,
          $4, s.sale_price,
          $5, s.default_style,
          $6, (
          SELECT json_agg(
            json_build_object(
              $7, p.thumbnail_url,
              $8, p.url
            )
          )
          AS photos
          FROM photos p
          WHERE s.id = p.style_id
          ),
          $9, (
          SELECT json_object_agg(
            sk.id,
            json_build_object(
              $10, sk.quantity,
              $11, sk.size
            )
          )
          AS skus
          FROM skus sk
          WHERE s.id = sk.style_id
          )
        )
      ) AS results
    FROM styles s
    WHERE product_id = $12
    GROUP BY s.product_id
  `;
  return db.any(queryString, ['styles_id', 'name', 'original_price', 'sale_price', 'default?', 'photos', 'thumbnail_url', 'url', 'skus', 'quantity', 'size', productId]);
};

// SELECT
//       s.product_id,
//       json_agg(
//         json_build_object(
//           'styles_id', s.id,
//           'name', s.name,
//           'original_price', s.original_price,
//           'sale_price', s.sale_price,
//           'default?', s.default_style,
//           'photos', (
//           SELECT json_agg(
//             json_build_object(
//               'thumbnail_url', p.thumbnail_url,
//               'url', p.url
//             )
//           )
//           AS photos
//           FROM photos p
//           WHERE s.id = p.style_id
//           ),
//           'skus', (
//           SELECT json_object_agg(
//             sk.id,
//             json_build_object(
//               'quantity', sk.quantity,
//               'size', sk.size
//             )
//           )
//           AS skus
//           FROM skus sk
//           WHERE s.id = sk.style_id
//           )
//         )
//       ) AS results
//     FROM styles s
//     WHERE product_id = 1
//     GROUP BY s.product_id

module.exports.getRelated = (productId) => {
  const queryString = 'SELECT array_agg(related_product_id) FROM related_products WHERE current_product_id = $1';
  return db.any(queryString, productId);
};
