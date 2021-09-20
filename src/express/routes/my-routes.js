'use strict';

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const api = require(`../api`).getAPI();
const auth = require(`../middlewares/auth`);
const myRouter = new Router();
myRouter.use(auth);

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
myRouter.get(`/`, async (req, res) => {
  const { user } = req.session;
  const offers = await api.getOffers();
  res.render(`my-tickets`, {
    user,
    offers
  });
});

myRouter.get(`/comments`, async (req, res) => {
  const { user } = req.session;
  const offers = await api.getOffers({ comments: true });
  res.render(`comments`, {
    user,
    offers: offers.slice(0, 3)
  });
});

module.exports = myRouter;
