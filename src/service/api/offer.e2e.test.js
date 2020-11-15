"use strict";

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);

const { HttpCode } = require(`../constants`);

const mockData = [
  {
    "id": "mzt3Cu",
    "title": "Отдам даром фигурки.",
    "picture": "item07.jpg",
    "description": "Таких предложений больше нет! Кому нужен этот новый телефон, если тут такое... При покупке с меня бесплатная доставка в черте города. Две страницы заляпаны свежим кофе.",
    "type": "offer",
    "sum": 47557,
    "category": [
      "Журналы"
    ],
    "comments": [
      {
        "text": "Оплата наличными или перевод на карту?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.",
        "id": "JGMAn6"
      },
      {
        "text": "А сколько игр в комплекте?",
        "id": "vltkyx"
      }
    ]
  },
  {
    "id": "1ImS9o",
    "title": "Отдам в хорошие руки подшивку «Мурзилка».",
    "picture": "item14.jpg",
    "description": "Мой дед не мог её сломать. Даю недельную гарантию. Товар в отличном состоянии. Если найдёте дешевле — сброшу цену.",
    "type": "sale",
    "sum": 3192,
    "category": [
      "Игры"
    ],
    "comments": [
      {
        "text": "Вы что?! В магазине дешевле.",
        "id": "bTPfd0"
      }
    ]
  },
  {
    "id": "44EqIo",
    "title": "Продам коллекцию журналов «Огонёк».",
    "picture": "item04.jpg",
    "description": "Это настоящая находка для коллекционера! Срок годности не ограничен. Не пытайтесь торговаться. Цену вещам я знаю. Продаю с болью в сердце...",
    "type": "sale",
    "sum": 33364,
    "category": [
      "Животные"
    ],
    "comments": [
      {
        "text": "Совсем немного...А где блок питания?",
        "id": "AwcMBU"
      },
      {
        "text": "Оплата наличными или перевод на карту?А сколько игр в комплекте?Почему в таком ужасном состоянии?",
        "id": "1ud5_l"
      },
      {
        "text": "Вы что?! В магазине дешевле.",
        "id": "ZJen1V"
      },
      {
        "text": "Почему в таком ужасном состоянии?",
        "id": "utd7PU"
      }
    ]
  },
  {
    "id": "Uyx3Jg",
    "title": "Продам коллекцию журналов «Огонёк».",
    "picture": "item10.jpg",
    "description": "Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера! Таких предложений больше нет! Если товар не понравится — верну всё до последней копейки.",
    "type": "sale",
    "sum": 54734,
    "category": [
      "Игры"
    ],
    "comments": [
      {
        "text": "А где блок питания?",
        "id": "WSdklY"
      },
      {
        "text": "Почему в таком ужасном состоянии?",
        "id": "CF4cuX"
      }
    ]
  },
  {
    "id": "GWELCk",
    "title": "Продам отличную подборку фильмов на VHS.",
    "picture": "item09.jpg",
    "description": "Таких предложений больше нет! Кажется, что это хрупкая вещь. Товар в отличном состоянии. Пользовались бережно и только по большим праздникам.",
    "type": "offer",
    "sum": 86111,
    "category": [
      "Журналы"
    ],
    "comments": [
      {
        "text": "А сколько игр в комплекте?Оплата наличными или перевод на карту?",
        "id": "Z8HWbr"
      },
      {
        "text": "Совсем немного...А сколько игр в комплекте?",
        "id": "JFxD-Y"
      },
      {
        "text": "Почему в таком ужасном состоянии?Оплата наличными или перевод на карту?Совсем немного...",
        "id": "Y1YovO"
      }
    ]
  }
]

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));

  test(`First offer's id equals "mzt3Cu"`, () => expect(response.body[0].id).toBe(`mzt3Cu`));

});

describe(`API returns an offer with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/mzt3Cu`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Отдам даром фигурки."`, () => expect(response.body.title).toBe(`Отдам даром фигурки.`));

});

describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/mzt3Cu`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/mzt3Cu`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent offer`, () => {

  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/1ImS9o`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`1ImS9o`));

  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/44EqIo/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
