'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const myRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
myRouter.get(`/`, (req, res) => res.send(`/my`));
myRouter.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = myRoutes;