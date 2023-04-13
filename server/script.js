/* eslint-disable import/no-unresolved */
const http = require('k6/http');
const { sleep } = require('k6');

export const options = {
  duration: '30s',
  // stages: [
  //   { target: 1000, duration: '30s' },
  // ],
};

export default function () {
  http.get('http://localhost:3000/products/999999/styles');
  sleep(1);
}
