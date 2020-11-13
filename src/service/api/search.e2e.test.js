const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const { HttpCode } = require(`../constants`);

const mockData = [
  {
    "id": "wOpXI7",
    "title": "Куплю детские санки.",
    "picture": "item03.jpg",
    "description": "Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера! Две страницы заляпаны свежим кофе. Срок годности не ограничен.",
    "type": "sale",
    "sum": 4343,
    "category": [
      "Журналы"
    ],
    "comments": [
      {
        "text": "Продаю в связи с переездом. Отрываю от сердца.",
        "id": "8XqrZo"
      }
    ]
  },
  {
    "id": "SQItF0",
    "title": "Куплю велотренажёр.",
    "picture": "item16.jpg",
    "description": "Продаю с болью в сердце... Мой дед не мог её сломать. Бонусом отдам все аксессуары. Кому нужен этот новый телефон, если тут такое...",
    "type": "offer",
    "sum": 64023,
    "category": [
      "Спорт"
    ],
    "comments": [
      {
        "text": "А где блок питания?А сколько игр в комплекте?С чем связана продажа? Почему так дешёво?",
        "id": "LV2qyG"
      }
    ]
  },
  {
    "id": "CGHB30",
    "title": "Продам советскую посуду. Почти не разбита.",
    "picture": "item02.jpg",
    "description": "Отдам сразу всю коллекцию. Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь. При покупке с меня бесплатная доставка в черте города.",
    "type": "sale",
    "sum": 80313,
    "category": [
      "Посуда"
    ],
    "comments": [
      {
        "text": "Вы что?! В магазине дешевле.",
        "id": "UKY3sc"
      },
      {
        "text": "Почему в таком ужасном состоянии?",
        "id": "pfHLFQ"
      },
      {
        "text": "Оплата наличными или перевод на карту?",
        "id": "Bic89X"
      }
    ]
  },
  {
    "id": "fktI8R",
    "title": "Отдам в хорошие руки подшивку «Мурзилка».",
    "picture": "item13.jpg",
    "description": "При покупке с меня бесплатная доставка в черте города. Кому нужен этот новый телефон, если тут такое... Две страницы заляпаны свежим кофе. Если товар не понравится — верну всё до последней копейки.",
    "type": "sale",
    "sum": 9457,
    "category": [
      "Журналы"
    ],
    "comments": [
      {
        "text": "Почему в таком ужасном состоянии?Совсем немного...А сколько игр в комплекте?",
        "id": "eDcGhf"
      },
      {
        "text": "С чем связана продажа? Почему так дешёво?А где блок питания?",
        "id": "SIhXCm"
      }
    ]
  },
  {
    "id": "cY3V49",
    "title": "Куплю велотренажёр.",
    "picture": "item05.jpg",
    "description": "Пользовались бережно и только по большим праздникам. Отдам сразу всю коллекцию. Товар в отличном состоянии. Если найдёте дешевле — сброшу цену.",
    "type": "offer",
    "sum": 44387,
    "category": [
      "Спорт"
    ],
    "comments": [
      {
        "text": "Продаю в связи с переездом. Отрываю от сердца.А сколько игр в комплекте?",
        "id": "p6Efoc"
      },
      {
        "text": "Совсем немного...",
        "id": "48Oh_2"
      },
      {
        "text": "Продаю в связи с переездом. Отрываю от сердца.Вы что?! В магазине дешевле.Почему в таком ужасном состоянии?",
        "id": "FGepZE"
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Куплю детские санки`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`wOpXI7`));

});

test(`API returns code 404 if nothing is found`,
  () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HttpCode.NOT_FOUND)
);
