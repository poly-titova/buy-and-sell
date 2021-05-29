'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../constants`);
const schema = require(`../lib/schema`);
const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

module.exports = (app, offerService, commentService) => {
  const route = new Router();

  app.use(`/offers`, route);

  // возвращает список объявлений
  route.get(`/`, async (req, res) => {
    const { offset, limit, comments } = req.query;
    let result;
    if (limit || offset) {
      result = await offerService.findPage({ limit, offset });
    } else {
      result = await offerService.findAll(comments);
    }
    res.status(HttpCode.OK).json(result);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:offerId`, async (req, res) => {
    // идентификатор желаемого объявления получаем из параметров
    const { offerId } = req.params;
    const { comments } = req.query;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен
    // вернуть информацию по определённому объявлению
    const offer = await offerService.findOne(offerId, comments);

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
  route.post(`/`, offerValidator(schema), async (req, res) => {
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод create, который должен
    // создаёт новое объявление
    const offer = await offerService.create(req.body);
    const { body } = req;
    res.json({
      message: `A new offer created.`,
      data: body
    });

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  // редактирует определённое объявление
  route.put(`/:offerId`, offerValidator, async (req, res) => {
    // идентификатор желаемого объявления получаем из параметров
    const { offerId } = req.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findOne, который должен
    // вернуть информацию по определённому объявлению
    const updated = await offerService.update(offerId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .send(`Updated`);
  });

  // удаляет определённое объявление
  route.delete(`/:offerId`, async (req, res) => {
    // идентификатор желаемого объявления получаем из параметров
    const { offerId } = req.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод drop, который должен
    // удаляет определённое объявление
    const offer = await offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  // возвращает список комментариев определённого объявления
  route.get(`/:offerId/comments`, offerExist(offerService), async (req, res) => {
    // сохраняем объявение, чтобы не искать в следующий раз
    const { offerId } = res.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findAll, который должен
    // вернуть все комментарии
    const comments = await commentService.findAll(offerId);

    res.status(HttpCode.OK)
      .json(comments);
  });


  // удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), async (req, res) => {
    // идентификатор желаемого комментария получаем из параметров
    const { commentId } = req.params;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод drop, который должен
    // удаляет определённый комментарий
    const deleted = await commentService.drop(commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deleted);
  });

  // создаёт новый комментарий
  route.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], (req, res) => {
    // сохраняем объявение, чтобы не искать в следующий раз
    const { offer } = res.locals;
    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод drop, который должен
    // удаляет определённый комментарий
    const comment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
