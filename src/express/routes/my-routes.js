'use strict';

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const api = require(`../api`).getAPI();
const myRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
myRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`my-tickets`, { offers });
});

myRouter.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`comments`, { offers: offers.slice(0, 3) });
});

module.exports = myRoutes;
