'use strict';

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const offersRouter = new Router();
const api = require(`../api`).getAPI();

const multer = require(`multer`);
const path = require(`path`);
const { nanoid } = require(`nanoid`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

// Создали хранилище с помощью метода multer.diskStorage
const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `offers`, т.к. уже указали при подключении модуля маршрута
// в `index.js`.
offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, async (req, res) => {
  const { error } = req.query;
  const categories = await api.getCategories();
  res.render(`offers/new-ticket`, { categories, error });
});

const upload = multer({ storage });

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const { body, file } = req;
  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: body.category
  };
  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`/offers/add?error=${encodeURIComponent(error.response.data)}`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const { id } = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`ticket-edit`, { offer, categories });
});

offersRouter.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const offer = await api.getOffer(id, true);
  res.render(`offers/ticket`, { offer });
});

module.exports = offersRouter;
