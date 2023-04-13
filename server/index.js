const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
// require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.get('/loaderio-989755a2fdb5f1783c3abc2a85710ccd', (req, res) => {
  res.send('loaderio-989755a2fdb5f1783c3abc2a85710ccd');
});
app.use(morgan('dev'));
app.use('/products', routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
