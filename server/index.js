const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.get('/loaderio-40c957308562f21e6be4216867eb7c22', (req, res) => {
  res.send('loaderio-40c957308562f21e6be4216867eb7c22');
});
app.use(morgan('dev'));
app.use('/products', routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
