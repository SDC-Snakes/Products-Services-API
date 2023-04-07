const express = require('express');

const router = express.Router();
const controller = require('./controllers');

router.get('/products', controller.getList);
router.get('/products/:product_id', controller.getProduct);
router.get('/products/:product_id/styles', controller.getStyles);
router.get('/products/:product_id/related', controller.getRelated);

module.exports = router;
