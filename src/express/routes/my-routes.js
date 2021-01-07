'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const myRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
myRoutes.get(`/`, (req, res) => res.render(`my-tickets`));
myRoutes.get(`/comments`, (req, res) => res.render(`comments`));

module.exports = myRoutes;
