'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const mainRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
mainRoutes.get(`/`, (req, res) => res.send(`/`));
mainRoutes.get(`/register`, (req, res) => res.send(`/register`));
mainRoutes.get(`/login`, (req, res) => res.send(`/login`));
mainRoutes.get(`/search`, (req, res) => res.send(`/search`));

module.exports = mainRoutes;