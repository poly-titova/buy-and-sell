'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../constants`);

const route = new Router();

module.exports = (app, offerService) => {
  app.use(`/offers`, route);

  // возвращает список объявлений
  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    res.status(HttpCode.OK).json(offers);
  });
}