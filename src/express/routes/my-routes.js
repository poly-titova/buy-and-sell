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

module.exports = myRoutes;
