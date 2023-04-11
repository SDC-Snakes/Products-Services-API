const express = require('express');
const routes = require('./routes');
// require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use('/products', routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
