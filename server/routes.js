const express = require('express');

const router = express.Router();
const controller = require('./controllers');

router.get('/products', controller.get);
// router.get('/products/:product_id', controller.get);
// router.get('/products/:product_id/styles', controller.get);
// router.get('/products/:product_id/related', controller.get);

module.exports = router;
