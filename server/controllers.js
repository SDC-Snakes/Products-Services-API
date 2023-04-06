const models = require('./models');

module.exports.get = (req, res) => {
  models.getProducts()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
