const express = require('express');

const router = express.Router();
const controller = require('./controllers');

router.get('/', controller.getList);
router.get('/:product_id', controller.getProduct);
router.get('/:product_id/styles', controller.getStyles);
router.get('/:product_id/related', controller.getRelated);

module.exports = router;
