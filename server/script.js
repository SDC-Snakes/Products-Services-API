/* eslint-disable import/no-unresolved */
const http = require('k6/http');
const { sleep } = require('k6');

export const options = {
  // vus: 10,
  duration: '30s',
  target: 2000,
};

export default function () {
  http.get('http://localhost:3000/products/');
  sleep(1);
}
