"use strict";

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);

const { HttpCode } = require(`../constants`);

const mockData = [
  {
    "id": "tJiGES",
    "title": "Продам отличную подборку фильмов на VHS.",
    "picture": "item15.jpg",
    "description": "Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Отдам сразу всю коллекцию. Пользовались бережно и только по большим праздникам.",
    "type": "offer",
    "sum": 68955,
    "category": [
      "Игры"
    ],
    "comments": [
      {
        "text": "Неплохо, но дорого",
        "id": "y3W0gi"
      },
      {
        "text": "Вы что?! В магазине дешевле.",
        "id": "DwVPTE"
      },
      {
        "text": "Неплохо, но дорогоПочему в таком ужасном состоянии?",
        "id": "gPhpvQ"
      }
    ]
  },
  {
    "id": "4tjPZE",
    "title": "Продам отличную подборку фильмов на VHS.",
    "picture": "item13.jpg",
    "description": "Таких предложений больше нет! Кому нужен этот новый телефон, если тут такое... Товар в отличном состоянии. Не пытайтесь торговаться. Цену вещам я знаю.",
    "type": "sale",
    "sum": 23600,
    "category": [
      "Посуда"
    ],
    "comments": [
      {
        "text": "А где блок питания?Вы что?! В магазине дешевле.А сколько игр в комплекте?",
        "id": "iqhQrw"
      }
    ]
  },
  {
    "id": "cPIx9o",
    "title": "Куплю велотренажёр.",
    "picture": "item16.jpg",
    "description": "Кажется, что это хрупкая вещь. Товар в отличном состоянии. Таких предложений больше нет! Продаю с болью в сердце...",
    "type": "offer",
    "sum": 33692,
    "category": [
      "Книги"
    ],
    "comments": [
      {
        "text": "А где блок питания?С чем связана продажа? Почему так дешёво?",
        "id": "slSZzT"
      },
      {
        "text": "Вы что?! В магазине дешевле.",
        "id": "_etkdF"
      }
    ]
  },
  {
    "id": "Y9PgYO",
    "title": "Куплю антиквариат.",
    "picture": "item06.jpg",
    "description": "Даю недельную гарантию. Кажется, что это хрупкая вещь. Отдам сразу всю коллекцию. Пользовались бережно и только по большим праздникам.",
    "type": "offer",
    "sum": 91476,
    "category": [
      "Музыка"
    ],
    "comments": [
      {
        "text": "А где блок питания?Совсем немного...",
        "id": "_GSIyD"
      },
      {
        "text": "Оплата наличными или перевод на карту?Почему в таком ужасном состоянии?",
        "id": "4-E_Yy"
      }
    ]
  },
  {
    "id": "eKnpJE",
    "title": "Продам книги Стивена Кинга.",
    "picture": "item09.jpg",
    "description": "Кому нужен этот новый телефон, если тут такое... Даю недельную гарантию. Это настоящая находка для коллекционера! Мой дед не мог её сломать.",
    "type": "offer",
    "sum": 31291,
    "category": [
      "Разное"
    ],
    "comments": [
      {
        "text": "Вы что?! В магазине дешевле.Оплата наличными или перевод на карту?",
        "id": "I4YiB0"
      },
      {
        "text": "А сколько игр в комплекте?",
        "id": "aOoq-W"
      },
      {
        "text": "Совсем немного...Продаю в связи с переездом. Отрываю от сердца.С чем связана продажа? Почему так дешёво?",
        "id": "JmUVjn"
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 5 categories`, () => expect(response.body.length).toBe(5));

  test(`Category names are "Игры", "Посуда", "Книги", "Музыка", "Разное"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Игры`, `Посуда`, `Книги`, `Музыка`, `Разное`])
      )
  );

});
