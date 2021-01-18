'use strict';

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const mainRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
mainRoutes.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`main`, { offers });
});
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/search`, (req, res) => res.render(`search-result`));

module.exports = mainRoutes;
