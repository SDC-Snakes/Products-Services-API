const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.get('/loaderio-33aa9049fb162780bcf2ff6bbc734e6b', (req, res) => {
  res.send('loaderio-33aa9049fb162780bcf2ff6bbc734e6b');
});
app.use(morgan('dev'));
app.use('/products', routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
