'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../constants`);
const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exists`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
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

  // редактирует определённое объявление
  route.put(`/:offerId`, offerValidator, (req, res) => {
    // идентификатор желаемого объявления получаем из параметров
    const {offerId} = req.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен 
    // вернуть информацию по определённому объявлению
    const existOffer = offerService.findOne(offerId);

    if (!existOffer) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }
    
    // вызываем метод update, который должен 
    // редактировать определённое объявление
    const updatedOffer = offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });

  // удаляет определённое объявление
  route.delete(`/:offerId`, (req, res) => {
    // идентификатор желаемого объявления получаем из параметров
    const {offerId} = req.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод drop, который должен 
    // удаляет определённое объявление
    const offer = offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  // возвращает список комментариев определённого объявления
  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    // сохраняем объявение, чтобы не искать в следующий раз
    const {offer} = res.locals;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findAll, который должен 
    // вернуть все комментарии
    const comments = commentService.findAll(offer);

    res.status(HttpCode.OK)
      .json(comments);
  });
}