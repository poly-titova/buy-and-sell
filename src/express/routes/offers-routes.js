'use strict';

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const offersRouter = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `offers`, т.к. уже указали при подключении модуля маршрута
// в `index.js`.
offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, (req, res) => res.render(`new-ticket`));

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`offers/ticket-edit`, {offer, categories});
});

offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));

module.exports = offersRouter;
