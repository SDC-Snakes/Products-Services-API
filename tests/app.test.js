/* eslint-disable import/no-extraneous-dependencies */
// import { describe, test, expect } from 'jest';

const request = require('supertest');

const app = require('../server/app');

describe('API tests', () => {
  it('get /products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(5);
  });

  it('get /products/:product_id', async () => {
    const response = await request(app).get('/products/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.features.length).toBe(2);
    expect(response.body.default_price).toBe(140);
  });

  it('get /products/:product_id/styles', async () => {
    const response = await request(app).get('/products/1/styles');
    expect(response.statusCode).toBe(200);
  }, 15000);

  it('get /products/:product_id/related', async () => {
    const response = await request(app).get('/products/1/related');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(4);
  });
});
