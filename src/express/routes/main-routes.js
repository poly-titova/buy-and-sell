'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const mainRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
mainRouter.get(`/`, (req, res) => res.send(`/`));
mainRouter.get(`/register`, (req, res) => res.send(`/register`));
mainRouter.get(`/login`, (req, res) => res.send(`/login`));
mainRouter.get(`/search`, (req, res) => res.send(`/search`));

module.exports = mainRoutes;