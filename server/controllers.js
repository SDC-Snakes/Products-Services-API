const models = require('./models');

module.exports.getList = (req, res) => {
  models.getList(req.query.count, req.query.page)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.getProduct = (req, res) => {
  models.getProduct(req.params.product_id)
    .then((results) => {
      res.status(200).send(results[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.getStyles = (req, res) => {
  models.getStyles(req.params.product_id)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.getRelated = (req, res) => {
  models.getRelated(req.params.product_id)
    .then((results) => {
      const data = results.map((id) => id.related_product_id);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
