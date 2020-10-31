'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../constants`);
const offerValidator = require(`../middlewares/offer-validator`);

const route = new Router();

module.exports = (app, offerService) => {
  app.use(`/offers`, route);

  // возвращает список объявлений
  route.get(`/`, (req, res) => {
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findAll, который должен 
    // вернуть все объявления
    const offers = offerService.findAll();
    res.status(HttpCode.OK).json(offers);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:offerId`, (req, res) => {
    // идентификатор желаемого объявления получаем из параметров
    const { offerId } = req.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен 
    // вернуть информацию по определённому объявлению
    const offer = offerService.findOne(offerId);

    // если будет запрошенна информация о несуществующем объявлении
    if (!offer) {
      // мы отреагируем соответствующим кодом — 404
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  // создаёт новое объявление
  route.post(`/`, offerValidator, (req, res) => {
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод create, который должен 
    // создаёт новое объявление
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });
}