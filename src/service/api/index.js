'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const offer = require(`../api/offer`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  OfferService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  offer(app, new OfferService(mockData));
})();

module.exports = app;