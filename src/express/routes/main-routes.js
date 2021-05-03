'use strict';

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();

const OFFERS_PER_PAGE = 8;

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
mainRouter.get(`/`, async (req, res) => {
  // получаем номер страницы
  let { page = 1 } = req.query;
  page = +page;

  // количество запрашиваемых объявлений равно количеству объявлений на странице
  const limit = OFFERS_PER_PAGE;

  // количество объявлений, которое нам нужно пропустить - это количество объявлений на предыдущих страницах
  const offset = (page - 1) * OFFERS_PER_PAGE;
  const [
    { count, offers },
    categories
  ] = await Promise.all([
    api.getOffers({ limit, offset }),
    api.getCategories(true)
  ]);

  // количество страниц — это общее количество объявлений, поделённое на количество объявлений на странице (с округлением вверх)
  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  // передадим все эти данные в шаблон
  res.render(`main`, { offers, categories, page, totalPages });
});
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/search`, async (req, res) => {
  try {
    const { search } = req.query;
    const results = await api.search(search);

    res.render(`search-result`, {
      results
    });
  } catch (error) {
    res.render(`search-result`, {
      results: []
    });
  }
});

module.exports = mainRoutes;
